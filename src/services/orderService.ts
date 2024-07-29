import { GroupedOrder } from '@/src/types';
import { db } from '../database';
import { AuthGetCurrentUserServer } from '../utils/amplify-server-utils';
import { RawBuilder, sql } from 'kysely';

export async function getOrders({ year }: { year?: string }) {
  try {
    const user = await AuthGetCurrentUserServer();

    if (!user) {
      throw new Error('Forbidden');
    }

    let query = db
      .selectFrom('orders')
      .innerJoin('addresses', 'addresses.id', 'orders.address_id')
      .innerJoin('order_items', 'order_items.order_id', 'orders.id')
      .innerJoin(
        'product_variants',
        'product_variants.id',
        'order_items.product_variant_id'
      )
      .innerJoin('products', 'products.id', 'product_variants.product_id')
      .where('orders.user_sub', '=', user.userId)
      .select([
        'orders.id as order_id',
        'orders.status as order_status',
        'orders.order_date',
        'orders.total_price',
        'addresses.name as address_name',
        'addresses.surname as address_surname',
        'addresses.address_line1',
        'addresses.address_line2',
        'addresses.city',
        'addresses.state',
        'addresses.postal_code',
        'addresses.country',
        'addresses.address_name as address_label',
        'product_variants.option as product_option',
        'product_variants.price as product_price',
        'product_variants.s3_link as product_image',
        'order_items.quantity',
        'products.brand',
        'products.name as item_name',
        'products.category',
      ])
      .orderBy('orders.order_date', 'desc');

    if (year && year !== 'Last 3 Months') {
      query = query.where(sql`EXTRACT(YEAR FROM orders.order_date)`, '=', year);
    } else {
      const date = new Date();
      date.setMonth(date.getMonth() - 3);
      query = query.where('orders.order_date', '>=', date);
    }

    const orders = await query.execute();

    const groupedOrders = orders.reduce((acc, order) => {
      if (!acc[order.order_id]) {
        acc[order.order_id] = {
          order_id: order.order_id,
          order_date: order.order_date,
          total_price: order.total_price,
          status: order.order_status,
          address: {
            address_line1: order.address_line1,
            address_line2: order.address_line2,
            city: order.city,
            state: order.state,
            postal_code: order.postal_code,
            country: order.country,
            address_name: order.address_name,
            name: order.address_name,
            surname: order.address_surname,
          },
          items: [],
        };
      }
      acc[order.order_id].items.push({
        product_name: order.item_name,
        category: order.category,
        brand: order.brand,
        price: order.product_price,
        quantity: order.quantity,
        product_image: order.product_image,
      });

      return acc;
    }, {} as Record<number, GroupedOrder>);

    return Object.values(groupedOrders).reverse();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Internal server error');
  }
}
