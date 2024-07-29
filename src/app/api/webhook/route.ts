import Stripe from 'stripe';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/src/database';
import { CartItem } from '@/src/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
  const sig = headers().get('stripe-signature') as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return Response.json(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      if (
        !paymentIntent.metadata ||
        !paymentIntent.metadata.userId ||
        !paymentIntent.metadata.items ||
        !paymentIntent.metadata.address_id
      ) {
        console.error('Missing metadata or userId/items/address_id');
        return Response.json('Bad Request: Missing metadata', { status: 400 });
      }

      const userId = paymentIntent.metadata.userId;
      const items: CartItem[] = JSON.parse(paymentIntent.metadata.items);
      const addressId: number = parseInt(paymentIntent.metadata.address_id, 10);

      try {
        await db.transaction().execute(async (trx) => {
          const order = await trx
            .insertInto('orders')
            .values({
              user_sub: userId,
              total_price: paymentIntent.amount_received
                ? paymentIntent.amount_received / 100
                : 0,
              order_date: new Date(),
              address_id: addressId,
              status: 'processing',
            })
            .returning('id')
            .executeTakeFirstOrThrow();

          await Promise.all(
            items.map(async (item) => {
              return await trx
                .insertInto('order_items')
                .values({
                  order_id: order.id,
                  product_variant_id: item.id,
                  quantity: item.quantity,
                })
                .returningAll()
                .executeTakeFirst();
            })
          );
        });

        console.log('Order and order items successfully inserted.');
      } catch (error: any) {
        console.error(`Database Error: ${error.message}`);
        return Response.json(`Database Error: ${error.message}`, {
          status: 500,
        });
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return Response.json('Event received', { status: 200 });
}
