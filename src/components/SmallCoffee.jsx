import Image from "next/image";
import { yellow } from "tailwindcss/colors";

export default function SmallCoffee({ coffee }) {
  return (
    <div className="relative">
      <Image
        className="w-30 opacity-70 transition-opacity hover:opacity-100 cursor-pointer"
        src={`/images/${coffee}-pack.png`}
        alt={`${coffee} pack`}
        width={100}
        height={100}
      />
      <h4 className={`text-${coffee} cursor-pointer font-bold pt-5`}>
        {coffee[0].toUpperCase() + coffee.slice(1)}
      </h4>
    </div>
  );
}
