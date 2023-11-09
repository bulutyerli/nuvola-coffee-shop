"use client";

import BigCoffee from "@/components/BigCoffee";
import coffeeData from "@/data/coffee-data.json";

export default function ShopPage() {
  return (
    <section className="flex flex-col gap-8 max-w-screen-2xl self-center">
      {coffeeData.map((data) => {
        return <BigCoffee key={data.id} data={data} />;
      })}
    </section>
  );
}
