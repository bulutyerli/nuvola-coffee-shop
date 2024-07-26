import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface Database {
  addresses: AddressTable;
  orders: OrderTable;
  order_items: OrderItemsTable;
  products: ProductsTable;
  product_variants: ProductVariantsTable;
  users: UsersTable;
}

export interface AddressTable {
  id: Generated<number>;
  address_name: string;
  name: string;
  surname: string;
  user_sub: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export type Address = Selectable<AddressTable>;
export type NewAddress = Insertable<AddressTable>;
export type AddressUpdate = Updateable<AddressTable>;

export interface OrderTable {
  id: Generated<number>;
  user_sub: string;
  order_date: Date;
  total_price: number;
  address_id: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
}

export type Order = Selectable<OrderTable>;
export type NewOrder = Insertable<OrderTable>;

export interface OrderItemsTable {
  id: Generated<number>;
  order_id: number;
  product_variant_id: number;
  quantity: number;
}

export type OrderItems = Selectable<OrderItemsTable>;
export type NewOrderItems = Insertable<OrderItemsTable>;

export interface ProductsTable {
  id: Generated<number>;
  name: string;
  category: string;
  brand: string;
}

export type Products = Selectable<ProductsTable>;
export type NewProduct = Insertable<ProductsTable>;

export interface ProductVariantsTable {
  id: Generated<number>;
  product_id: number;
  option: string;
  price: number;
  s3_link: string;
}

export type ProductVariant = Selectable<ProductVariantsTable>;
export type NewProductVariant = Insertable<ProductVariantsTable>;

export interface UsersTable {
  id: Generated<number>;
  sub: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export type Users = Selectable<UsersTable>;
export type NewUser = Selectable<UsersTable>;
