"use client";

import CartCard from "@/components/CartCard";
import CustomButton from "@/components/CustomButton";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateOrderNumber } from "../helpers/generateOrderNumber";
import { resetCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, cartCount } = useSelector((state) => state.cart);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  let total = 0;

  const handleBuy = async () => {
    const orderNumber = generateOrderNumber();

    await Promise.all(
      cart.map(async (item) => {
        try {
          setError(false);
          setIsLoading(true);
          const res = await axios.post("/api/orders", {
            orderNumber: orderNumber,
            productId: item.product_id,
            sizeId: item.sizeId,
            quantity: item.quantity,
            price: item.price,
            total: total,
          });
          if (res.data.error) {
            throw new Error(error);
          }
          setSuccess(true);
          dispatch(resetCart());
          setTimeout(() => {
            router.push("/orders");
          }, 3000);
        } catch (error) {
          setError(true);
        } finally {
          setIsLoading(false);
        }
      })
    );

    console.log("All items processed");
  };
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
          <CustomButton
            isLoading={isLoading}
            onClick={handleBuy}
            text={"Buy"}
          />
        </div>
      )}
      {error && (
        <p className="text-center self-center text-red-300">
          Opps, We couldn&apos;t complete your order, please try again.
        </p>
      )}
      {success && (
        <div className="text-center self-center flex flex-col gap-5">
          <p className=" text-green-500">
            Thank you for your purchase! Enjoy our delicious coffee.
          </p>
          <p className="text-neutral-200">
            You will be redirected to your orders.
          </p>
        </div>
      )}
    </div>
  );
}
