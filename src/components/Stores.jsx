import Image from "next/image";

export default function Stores({ city }) {
  let cityName;
  let shopAddress;

  if (city === "istanbul") {
    cityName = "Istanbul / Türkiye";
    shopAddress = "789 Bagdat Street Kadikoy District, Istanbul";
  } else if (city === "newyork") {
    cityName = "New York / USA";
    shopAddress = "Apt. 133 360 Evangeline Squares, Michalmouth, NY 22872-3279";
  } else if (city === "london") {
    cityName = "London / England";
    shopAddress = "71 Verdant Ln Catford, London SE6 1JD";
  } else {
    cityName = "Athens / Greece";
    shopAddress = "Kallirrois 72 Attica, 117 41";
  }
  return (
    <div>
      <div className="relative cursor-pointer group">
        <Image
          className="border-2 border-secondary rounded-2xl shadow-md shadow-secondary "
          src={`/images/cafe-${city}.jpeg`}
          alt={`${city} nuvola coffee shop`}
          width={500}
          height={500}
        ></Image>
        <span className="absolute top-2 left-2 p-1 rounded-lg text-secondary bg-gray-300 shadow-md shadow-secondary text-sm">
          {cityName}
        </span>
        <span className="absolute bottom-4 bg-secondary p-2 w-full text-primary font-thin opacity-0 transition-opacity group-hover:opacity-100">
          {shopAddress}
        </span>
      </div>
    </div>
  );
}
