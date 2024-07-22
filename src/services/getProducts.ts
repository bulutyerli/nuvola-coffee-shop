import { db } from '@/src/database';
import { GroupedProduct } from '../types';

export async function getProducts() {
  try {
    const products = await db
      .selectFrom('products')
      .innerJoin(
        'product_variants',
        'products.id',
        'product_variants.product_id'
      )
      .selectAll()
      .execute();

    const groupedProducts = products.reduce<Record<number, GroupedProduct>>(
      (acc, product) => {
        if (!acc[product.product_id]) {
          acc[product.product_id] = {
            id: product.product_id,
            name: product.name,
            category: product.category,
            brand: product.brand,
            options: [],
            imageUrl: product.s3_link,
          };
        }
        acc[product.product_id].options.push({
          id: product.id,
          option: product.option,
          price: product.price,
        });
        return acc;
      },
      {}
    );

    return Object.values(groupedProducts);
  } catch (error) {
    console.error('Error fetching products', error);
    throw new Error('Failed to fetch products');
  }
}
