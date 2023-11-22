"use client";

import coffeeData from "@/data/coffee-data.json";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { deleteItem, updateItem } from "@/store/cartThunk";

export default function CartCard({ data }) {
  const dispatch = useDispatch();
  const title =
    data.product_id === 1
      ? "Brazil"
      : data.product_id === 2
      ? "Columbia"
      : data.product_id === 3
      ? "Mexico"
      : "Ethiopia";

  const size =
    data.sizeId === "s1" ? "250g" : data.sizeId === "s2" ? "500g" : "1000g";

  const image = coffeeData[data.product_id - 1]?.package;

  const altText = `Nuvola Coffee ${title} Package`;

  return (
    <div className="flex flex-col items-center md:flex-row md:items-start gap-10 md:gap-20 md:px-10 w-full">
      <Image src={image} alt={altText} width={100} height={100}></Image>
      <div className="flex flex-col gap-2">
        <h2 className="text-neutral-300 text-xl">Nuvola Coffee {title}</h2>
        <dl className="text-neutral-300">
          <div className="grid grid-cols-2 gap-2">
            <div>Size:</div>
            <div className="text-neutral-400">{size}</div>
            <div>Quantity:</div>
            <select
              className="w-12 text-neutral-900 text-center bg-primary"
              name="quantity"
              value={data.quantity}
              onChange={(event) => {
                dispatch(
                  updateItem({
                    productId: data.product_id,
                    quantity: parseInt(event.target.value),
                    price: data.price,
                    sizeId: data.sizeId,
                  })
                );
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              {data.quantity > 5 && (
                <option value={data.quantity}>{data.quantity}</option>
              )}
            </select>
            <div>Price:</div>
            <div className="text-neutral-400">${data.price}</div>
            <div
              onClick={() => {
                dispatch(
                  deleteItem({
                    productId: data.product_id,
                    sizeId: data.sizeId,
                  })
                );
              }}
              className="text-xs text-red-400 cursor-pointer"
            >
              Delete
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
}
