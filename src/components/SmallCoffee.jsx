import Image from "next/image";

export default function SmallCoffee({ coffee }) {
  return (
    <div className="relative">
      <Image
        className="opacity-80 transition-opacity hover:opacity-100 cursor-pointer w-20 sm:w-36 h-auto"
        src={`/images/${coffee}-pack.png`}
        alt={`${coffee} pack`}
        width={125}
        height={125}
      />
      <h4 className={`text-${coffee} cursor-pointer font-bold pt-5`}>
        {coffee[0].toUpperCase() + coffee.slice(1)}
      </h4>
    </div>
  );
}
