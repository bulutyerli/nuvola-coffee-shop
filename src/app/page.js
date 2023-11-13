import Image from "next/image";
import Link from "next/link";
import StoreFlags from "@/components/StoreFlags";
import SmallCoffee from "@/components/SmallCoffee";
import ContentBox from "@/components/ContentBox";

export default function Home() {
  return (
    <main className="flex flex-col text-center  flex-grow">
      <section className="flex gap-3 items-center bg-secondary w-full justify-center p-4 flex-wrap sticky top-0 -z-10">
        <Image
          className="border-4 border-secondary rounded-2xl "
          src="/images/waitress.png"
          alt="waitress"
          width={1440}
          height={1440}
          priority
        ></Image>
        <h1 className="text-primary text-2xl sm:text-5xl self-center justify-center w-full p-3 ">
          Crafted For You
        </h1>
      </section>
      <section className="flex flex-col gap-6 px-3 bg-primary py-10 sm:py-36 z-10">
        <h2 className="text-2xl text-green-800 drop-shadow-md">
          Our Coffee Blends
        </h2>
        <h3>
          Discover the exceptional taste of our exclusive coffee collection by
          exploring our{" "}
          <Link className="underline text-blue-900" href="/shop">
            online store.
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
      <section className="flex flex-col flex-wrap items-center gap-20 bg-primary py-20 z-50">
        <div className="flex flex-wrap gap-20 justify-center ">
          <ContentBox
            image="/images/barista-coffee.jpg"
            title="Your exceptional experience awaits!"
            content="Carefully sourcing rare coffee beans from exotic locales,
          we've masterfully roasted them at Nuvola Coffee Shop. Each
          cup unfolds a unique narrative, a story that may never be told
          again!"
          />
          <ContentBox
            image="/images/pets-in-shop.jpg"
            title="We Love Pets!"
            content="We not only brew great coffee but also embrace your furry friends.
          We're a pet-friendly spot, inviting you to enjoy a cup of
          warmth with both your human and four-legged companions. Savor
          moments, one sip at a time, surrounded by the delightful company
          of your loyal friends."
            reverse={true}
          />
        </div>
        <div className="flex flex-wrap gap-20 justify-center">
          <ContentBox
            image="/images/eco-friendly.jpg"
            title="Sustainable Flavor"
            content="At Nuvola Coffee Shop, we believe in sustainability from bean to
          cup. Our commitment to the environment extends beyond our rich
          coffee blends. We take pride in implementing eco-friendly
          practices, from our packaging choices to waste reduction
          initiatives. Join us in sipping responsibly, knowing that your
          enjoyment of our coffee also supports a greener, more sustainable
          world. Every cup you savor is a step towards a cleaner, brighter
          future for our planet."
          />
          <ContentBox
            image="/images/unicef.png"
            title="Brewing Hope for Children with UNICEF"
            content="With each coffee you purchase, a portion of the proceeds goes
          directly to UNICEF, supporting their vital work in providing
          health care, clean water, education, and protection to children
          around the world. Together, we are brewing positive change and
          nurturing brighter futures."
            reverse={true}
          />
        </div>
      </section>
      <section className="flex flex-col items-center gap-5 bg-secondary p-10">
        <h2 className="text-xl px-3 text-neutral-300">
          We proudly serve in 4 countries. Check our stores{" "}
          <Link className="underline text-blue-300" href="stores">
            here
          </Link>
        </h2>
        <div className="flex flex-wrap justify-center items-center min-w-fit gap-2 sm:gap-10">
          <StoreFlags country={"TR"} />
          <StoreFlags country={"US"} />
          <StoreFlags country={"GB"} />
          <StoreFlags country={"GR"} />
        </div>
      </section>
    </main>
  );
}
