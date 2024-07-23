import { db } from '@/src/database';
import { CartItem } from '@/src/types';
import { authenticatedUser } from '@/src/utils/amplify-server-utils';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

const calculateOrderAmount = async (items: CartItem[]) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  const productIds = items.map((item) => item.id);
  const prices = await db
    .selectFrom('product_variants')
    .select(['price', 'id'])
    .where('product_variants.id', 'in', productIds)
    .execute();

  const totalPrice = items.reduce((total, item) => {
    const product = prices.find((price) => price.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  return Math.round(totalPrice * 100);
};

export async function POST(request: NextRequest) {
  try {
    const {
      items,
      address_id,
    }: { items: CartItem[] | null; address_id: number } = await request.json();
    const response = NextResponse.next();
    const user = await authenticatedUser({ request, response });

    if (!user) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (!items) {
      return Response.json({ error: 'Invalid Items' }, { status: 400 });
    }

    const total = await calculateOrderAmount(items);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: user.userId,
        items: JSON.stringify(items),
        address_id,
      },
    });

    return Response.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
