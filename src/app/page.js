import Image from "next/image";
import Link from "next/link";
import StoreFlags from "@/components/StoreFlags";
import SmallCoffee from "@/components/SmallCoffee";

export default function Home() {
  return (
    <main className="flex flex-col text-center gap-10 flex-grow">
      <section className="flex gap-3 items-center bg-secondary">
        <div className="w-full flex justify-center p-4 flex-wrap">
          <Image
            className="border-4 border-secondary rounded-2xl "
            src="/images/waitress.png"
            alt="waitress"
            width={1440}
            height={1440}
            priority
          ></Image>
          <h1 className="text-primary text-3xl sm:text-5xl self-center justify-center w-full p-3 ">
            Crafted For You
          </h1>
        </div>
      </section>
      <section className="flex flex-col gap-6 px-3">
        <h2 className="text-2xl text-green-800 drop-shadow-md">
          Our Coffee Blends
        </h2>
        <h3>
          For more information and buy our unique coffee, explore our{" "}
          <Link className="underline text-blue-900" href="/shop">
            shop
          </Link>
        </h3>
        <div className="flex justify-center flex-wrap gap-10 ">
          <Link href="/shop#brazil">
            <SmallCoffee coffee={"brazil"} />
          </Link>
          <Link href="/shop#columbia">
            <SmallCoffee coffee={"columbia"} />
          </Link>
          <Link href="/shop#mexico">
            <SmallCoffee coffee={"mexico"} />
          </Link>
          <Link href="/shop#ethiopia">
            <SmallCoffee coffee={"ethiopia"} />
          </Link>
        </div>
      </section>
      <article className="flex flex-col items-center gap-5 bg-secondary p-10">
        <h2 className="text-xl px-3 text-neutral-300">
          We proudly serve in 4 countries. Check our stores{" "}
          <Link className="underline text-blue-300" href="stores">
            here
          </Link>
        </h2>
        <div className="flex justify-between items-center min-w-fit gap-20">
          <StoreFlags country={"TR"} />
          <StoreFlags country={"US"} />
          <StoreFlags country={"GB"} />
          <StoreFlags country={"GR"} />
        </div>
      </article>
    </main>
  );
}
