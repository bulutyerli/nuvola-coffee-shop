import { db } from '@/src/database';
import { authenticatedUser } from '@/src/utils/amplify-server-utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.next();
    const userId = await authenticatedUser({ request, response });

    if (!userId) {
      return Response.json({ error: 'Forbidden' }, { status: 405 });
    }

    const orders = await db
      .selectFrom('orders')
      .innerJoin('addresses', 'addresses.id', 'orders.address_id')
      .innerJoin('order_items', 'orders.id', 'order_items.order_id')
      .where('orders.user_sub', '=', userId.userId)
      .selectAll()
      .execute();

    return Response.json({ orders });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
