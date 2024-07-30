import { Address } from './database-types';

export interface OrderAddress {
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  address_name: string;
  name: string;
  surname: string;
}

export interface GroupedProduct {
  id: number;
  name: string;
  category: string;
  brand: string;
  options: Array<{ id: number; option: string; price: number }>;
  imageUrl: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  option: string;
  quantity: number;
  imageUrl: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalPrice: number;
  totalItems: number;
}

export interface AddressState {
  addresses: Address[];
  selectedAddress: Address | null;
}

export interface OrderState {
  items: CartItem[];
  totalPrice: number;
}

export interface OrderItem {
  product_name: string;
  category: string;
  brand: string;
  product_image: string;
  price: number;
  quantity: number;
}

export interface GroupedOrder {
  order_id: number;
  order_date: Date;
  total_price: number;
  status: string;
  address: OrderAddress;
  items: OrderItem[];
}

export interface InfoType {
  id: number;
  title: string;
  desc: string;
  img: string;
}

export interface BigCoffeeType {
  id: number;
  name: string;
  title_1: string;
  content_1: string;
  title_2: string;
  content_2: string;
  imageUrl: string;
}
