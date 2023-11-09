import Stores from "@/components/Stores";
import Image from "next/image";

export default function StoresPage() {
  return (
    <div className="p-3 self-center">
      <h1 className="text-center font-bold text-xl pt-5 tracking-tight pb-5">
        Four Corners, One Taste
      </h1>
      <section className="flex flex-col items-center justify-center gap-5">
        <article className="flex flex-col gap-4 p-10 bg-secondary w-screen items-center">
          <h2 className="text-left font-semibold text-md max-w-screen-2xl text-primary">
            Embracing the World, One Cup at a Time
          </h2>
          <p className="leading-relaxed max-w-screen-lg text-neutral-400">
            At Nuvola Coffee Shop, we invite you to embark on a global coffee
            journey that transcends borders. While our core selection features
            exquisite coffees from around the world, we have chosen to establish
            a single coffee shop in four different countries as a tribute to the
            diversity and unity of the global coffee community.
          </p>
          <h2 className="text-left font-semibold text-md max-w-screen-2xl text-primary">
            A Symbol of Unity
          </h2>
          <p className="leading-relaxed max-w-screen-lg text-neutral-400">
            Each of our coffee shops, whether in Istanbul, Athens, London, or
            New York, stands as a symbol of unity. While our coffee beans may
            originate from various corners of the globe, we believe in the
            shared joy that a cup of coffee can bring. By having one shop in
            each city, we aim to celebrate the universal love for coffee that
            knows no boundaries.
          </p>
          <h2 className="text-left font-semibold text-md max-w-screen-2xl text-primary">
            A Melting Pot of Cultures
          </h2>
          <p className="leading-relaxed max-w-screen-lg text-neutral-400">
            Our coffee shops in these four unique cities represent a fusion of
            cultures and traditions. Istanbul, where East meets West, Athens
            with its ancient charm, the vibrant streets of London, and the
            ever-evolving spirit of New York—each location contributes to the
            rich tapestry of our global coffee experience.
          </p>
        </article>
        <div className="flex flex-wrap gap-5 items-center justify-center max-w-6xl">
          <Stores city={"istanbul"} />
          <Stores city={"newyork"} />
          <Stores city={"london"} />
          <Stores city={"greece"} />
        </div>
      </section>
    </div>
  );
}
