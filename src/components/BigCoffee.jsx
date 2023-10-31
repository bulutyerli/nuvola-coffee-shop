import Image from "next/image";

export default function BigCoffee({ brand }) {
  const countryName = brand[0].toUpperCase() + brand.slice(1);

  return (
    <div className="flex flex-col items-center justify-between px-3 gap-2 sm:grid sm:grid-cols-12 grid-rows-none sm:gap-5">
      <h2 className="text-2xl w-full flex justify-center drop-shadow text-secondary pt-3 sm:col-start-1 sm:col-end-6 sm:auto-rows-min">
        Nuvola Coffee {countryName}
      </h2>
      <Image
        className="border-4 border-secondary rounded-2xl sm:col-start-6 sm:col-end-13 sm:row-start-1 sm:row-end-6"
        src={`/images/${brand}-big.png`}
        alt={`${countryName} coffee`}
        width={800}
        height={800}
      ></Image>
      <h2 className="text-neutral-900 font-medium text-center sm:col-start-1 sm:col-end-6 sm:auto-rows-min">
        Where Tradition Meets Excellence
      </h2>
      <p className="text-neutral-700 sm:col-start-1 sm:col-end-6 auto-rows-min">
        Indulge in the essence of Brazil with every velvety sip of our standard
        Brazilian coffee. Our beans are meticulously sourced from the
        sun-drenched coffee plantations that stretch across the picturesque
        landscapes of Brazil. With notes of caramel, nutmeg, and subtle hints of
        citrus, our coffee is the embodiment of Brazilian excellence.
      </p>
    </div>
  );
}
