import Image from "next/image";
import Link from "next/link";
import StoreFlags from "@/components/StoreFlags";
import SmallCoffee from "@/components/SmallCoffee";
import ContentBox from "@/components/ContentBox";
import { PiCat, PiHandHeart, PiCoffee, PiLeaf } from "react-icons/pi";
import waitress from "../../public/images/waitress.png";
import barista from "../../public/images/barista-coffee.jpg";
import pets from "../../public/images/pets-in-shop.jpg";
import eco from "../../public/images/eco-friendly.jpg";
import unicef from "../../public/images/unicef.png";

export default function Home() {
  return (
    <main className="flex flex-col text-center  flex-grow">
      <section className="flex gap-3 items-center bg-secondary w-full justify-center p-4 flex-wrap sticky top-0 -z-10">
        <Image
          className="rounded-2x w-screen 2xl:w-4/6 h-auto"
          src={waitress}
          alt="waitress"
          placeholder="blur"
          priority
        ></Image>
        <h1 className="text-primary text-2xl sm:text-5xl self-center justify-center w-full p-3 ">
          Crafted For You
        </h1>
      </section>
      <section className="flex flex-col gap-6 px-3 bg-primary py-10 sm:py-36 ">
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
        <div className="flex flex-row justify-center flex-wrap gap-10 ">
          <div className="flex flex-col sm:flex-row gap-10">
            <Link href="/shop#brazil">
              <SmallCoffee coffee={"brazil"} />
            </Link>
            <Link href="/shop#columbia">
              <SmallCoffee coffee={"columbia"} />
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-10">
            <Link href="/shop#mexico">
              <SmallCoffee coffee={"mexico"} />
            </Link>
            <Link href="/shop#ethiopia">
              <SmallCoffee coffee={"ethiopia"} />
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col flex-wrap items-center gap-20 bg-primary py-10 ">
        <div className="flex flex-wrap gap-20 justify-center ">
          <ContentBox
            image={barista}
            title="Your exceptional experience awaits!"
            content="Carefully sourcing rare coffee beans from exotic locales,
          we've masterfully roasted them at Nuvola Coffee Shop. Each
          cup unfolds a unique narrative, a story that may never be told
          again!"
            icon={
              <div className="text-secondary text-3xl">
                <PiCoffee />
              </div>
            }
          />
          <ContentBox
            image={pets}
            title="We Love Pets!"
            content="We not only brew great coffee but also embrace your furry friends.
          We're a pet-friendly spot, inviting you to enjoy a cup of
          warmth with both your human and four-legged companions. Savor
          moments, one sip at a time, surrounded by the delightful company
          of your loyal friends."
            reverse={true}
            icon={
              <div className="text-yellow-700 text-3xl">
                <PiCat />
              </div>
            }
          />
        </div>
        <div className="flex flex-wrap gap-20 justify-center">
          <ContentBox
            image={eco}
            title="Sustainable Flavor"
            content="At Nuvola Coffee Shop, we believe in sustainability from bean to
          cup. Our commitment to the environment extends beyond our rich
          coffee blends. We take pride in implementing eco-friendly
          practices, from our packaging choices to waste reduction
          initiatives. Join us in sipping responsibly, knowing that your
          enjoyment of our coffee also supports a greener, more sustainable
          world. Every cup you savor is a step towards a cleaner, brighter
          future for our planet."
            icon={
              <div className="text-green-800 text-3xl">
                <PiLeaf />
              </div>
            }
          />
          <ContentBox
            image={unicef}
            title="Brewing Hope for Children with UNICEF"
            content="With each coffee you purchase, a portion of the proceeds goes
          directly to UNICEF, supporting their vital work in providing
          health care, clean water, education, and protection to children
          around the world. Together, we are brewing positive change and
          nurturing brighter futures."
            reverse={true}
            icon={
              <div className="text-red-800 text-3xl">
                <PiHandHeart />
              </div>
            }
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
