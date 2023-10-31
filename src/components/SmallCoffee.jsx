import Image from "next/image";
import { yellow } from "tailwindcss/colors";

export default function SmallCoffee({ coffee }) {
  let color;

  if (coffee === "brazil") {
    color = "green-800";
  } else if (coffee === "columbia") {
    color = "blue-900";
  } else if (coffee === "mexico") {
    color = "red-900";
  } else {
    color = "yellow-700";
  }
  console.log(color);

  return (
    <div className="relative">
      <Image
        className="w-30 opacity-70 transition-opacity hover:opacity-100 cursor-pointer group"
        src={`/images/${coffee}-pack.png`}
        alt={`${coffee} pack`}
        width={100}
        height={100}
      />
      <h4 className={`text-${color} cursor-pointer font-bold`}>
        {coffee[0].toUpperCase() + coffee.slice(1)}
      </h4>
    </div>
  );
}
