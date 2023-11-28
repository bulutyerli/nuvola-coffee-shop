import Image from "next/image";
import coffeeData from "@/data/coffee-data.json";

export default function OrderCard({ item }) {
  return (
    <div>
      {item.map((i) => {
        const id = i.product_id;
        const { package: image, name } = coffeeData[id - 1];

        return (
          <div
            className="border-b-2 border-secondary border-opacity-20 p-6"
            key={i.order}
          >
            <div className="flex items-start gap-10">
              <Image
                className="w-30 xl:w-auto h-auto"
                src={image}
                height={100}
                width={100}
                alt="Nuvola Coffee Shop"
              ></Image>
              <div className="flex flex-col gap-4">
                <h3 className="text-secondary text-lg xl:text-xl">{name}</h3>
                <div className="flex gap-3">
                  <span className="text-neutral-600">Quantity:</span>{" "}
                  <span className="text-neutral-800">{i.quantity}</span>
                </div>
                <span className="text-neutral-800">{i.size}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
