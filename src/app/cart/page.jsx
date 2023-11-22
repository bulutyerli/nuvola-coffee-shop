"use client";

import CartCard from "@/components/CartCard";
import CustomButton from "@/components/CustomButton";
import { useSelector } from "react-redux";

export default function CartPage() {
  const { cart, cartCount } = useSelector((state) => state.cart);
  let total = 0;
  return (
    <div className="flex flex-col items-start p-10 pb-20 gap-5 bg-primary_light w-10/12 self-center">
      <h1 className="text-lg md:text-2xl pb-4 border-b-2 w-full border-neutral-300 border-opacity-20 text-neutral-200">
        Shopping Cart
      </h1>
      {cartCount > 0 ? (
        cart.map((product, i) => {
          total = total + product.price * product.quantity;
          return (
            <div
              key={i}
              className="py-6 border-b-2 w-full border-neutral-300 border-opacity-20"
            >
              <CartCard data={product} />
            </div>
          );
        })
      ) : (
        <div className="w-full py-36">
          <h2 className="text-lg md:text-2xl text-center  text-neutral-400">
            Your shopping cart is empty
          </h2>
        </div>
      )}
      {cartCount > 0 && (
        <div className="flex text-lg md:text-2xl text-neutral-400 w-full justify-between">
          <div className="flex gap-2">
            <span>Total:</span>
            <span className="text-neutral-100 font-bold">${total}</span>
          </div>
          <CustomButton text={"Buy"} />
        </div>
      )}
    </div>
  );
}
