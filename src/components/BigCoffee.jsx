"use client";

import Image from "next/image";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { incrementItem } from "@/store/cartReducer";

export default function BigCoffee({ data }) {
  const isEven = data.id % 2 === 0;
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-5 items-center justify-between px-3 lg:grid lg:grid-cols-12 lg:gap-6 border-b-2 border-secondary pb-12">
      <h2
        className={`text-2xl w-full flex justify-center drop-shadow text-${data.color} py-5 lg:col-start-1 lg:col-end-13 lg:auto-rows-min`}
      >
        {data.name}
      </h2>
      <Image
        className={`border-4 border-secondary rounded-2xl ${
          isEven
            ? "lg:col-start-1 lg:col-end-8"
            : "lg:col-start-6 lg:col-end-13"
        } lg:row-start-2 lg:row-end-7`}
        src={data.image}
        alt={data.name}
        width={800}
        height={800}
      ></Image>
      <h2
        className={`text-neutral-900 font-medium text-center ${
          isEven
            ? "lg:col-start-8 lg:col-end-13"
            : "lg:col-start-1 lg:col-end-6"
        } lg:auto-rows-min`}
      >
        {data.title1}
      </h2>
      <p
        className={`text-neutral-700 ${
          isEven
            ? "lg:col-start-8 lg:col-end-13"
            : "lg:col-start-1 lg:col-end-6"
        } auto-rows-min`}
      >
        {data.content1}
      </p>
      <h2
        className={`text-neutral-900 font-medium text-center ${
          isEven
            ? "lg:col-start-8 lg:col-end-13"
            : "lg:col-start-1 lg:col-end-6"
        } lg:auto-rows-min`}
      >
        {data.title2}
      </h2>
      <p
        className={`text-neutral-700 ${
          isEven
            ? "lg:col-start-8 lg:col-end-13"
            : "lg:col-start-1 lg:col-end-6"
        } auto-rows-min`}
      >
        {data.content2}
      </p>
      <div
        className={`lg:row-start-6 lg:row-end-7 w-full ${
          isEven
            ? "lg:col-start-8 lg:col-end-13"
            : "lg:col-start-1 lg:col-end-6"
        }`}
      >
        <ul className="flex justify-around gap-2">
          {data.prices.map((item, i) => {
            return (
              <li
                key={i}
                className="flex flex-col items-center gap-1 text-center bg-secondary p-3 text-primary rounded-3xl shadow-md shadow-neutral-600"
              >
                <span className="font-light text-sm">{item.size}</span>
                <span className="text-xs font-thin">Ground Coffee</span>
                <div className="flex justify-around w-full">
                  <span className="font-medium">${item.price}</span>
                  <PiShoppingCartSimpleBold
                    onClick={() =>
                      dispatch(
                        incrementItem({
                          productId: data.id,
                          quantity: 1,
                          price: item.price,
                          sizeId: item.sizeId,
                        })
                      )
                    }
                    className="text-2xl cursor-pointer opacity-80 transition-opacity hover:opacity-100"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
