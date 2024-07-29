import styles from './page.module.scss';
import Hero from '../components/Hero/Hero';
import Container from '../components/Container/Container';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '../components/ProductCard/ProductCard';
import { getProducts } from '../services/getProducts';
import { getImageUrl } from '../utils/getImageUrl';
import InfoCard from '../components/InfoCard/InfoCard';
import { InfoType } from '../types';

const countries = [
  {
    title: 'Istanbul / Türkiye',
    href: '/locations#1',
    img: '/products/turkey.png',
  },
  {
    title: 'Athens / Greece',
    href: '/locations#2',
    img: '/products/greece.png',
  },
  {
    title: 'New York / USA',
    href: '/locations#3',
    img: '/products/usa.png',
  },
  {
    title: 'London / UK',
    href: '/locations#4',
    img: '/products/uk.png',
  },
];

const Information: InfoType[] = [
  {
    id: 1,
    title: 'Your exceptional experience awaits!',
    desc: "Carefully sourcing rare coffee beans from exotic locales, we've masterfully roasted them at Nuvola Coffee Shop. Each cup unfolds a unique narrative, a story that may never be told again!",
    img: '/products/barista-coffee.webp',
  },
  {
    id: 2,
    title: 'We Love Pets!',
    desc: "We not only brew great coffee but also embrace your furry friends. We're a pet-friendly spot, inviting you to enjoy a cup of warmth with both your human and four-legged companions. Savor moments, one sip at a time, surrounded by the delightful company of your loyal friends.",
    img: '/products/pets-in-shop.webp',
  },
  {
    id: 3,
    title: 'Sustainable Flavor',
    desc: 'At Nuvola Coffee Shop, we believe in sustainability from bean to cup. Our commitment to the environment extends beyond our rich coffee blends. We take pride in implementing eco-friendly practices, from our packaging choices to waste reduction initiatives. Join us in sipping responsibly, knowing that your enjoyment of our coffee also supports a greener, more sustainable world. Every cup you savor is a step towards a cleaner, brighter future for our planet.',
    img: '/products/eco-friendly.webp',
  },
  {
    id: 4,
    title: 'Brewing Hope for Children with UNICEF',
    desc: 'With each coffee you purchase, a portion of the proceeds goes directly to UNICEF, supporting their vital work in providing health care, clean water, education, and protection to children around the world. Together, we are brewing positive change and nurturing brighter futures.',
    img: '/products/unicef.webp',
  },
];

export default async function Home() {
  const products = await getProducts();

  return (
    <main className={styles.main}>
      <Hero />
      <Container color="primary" className={styles.sectionContainer}>
        <section className={styles.shopSection}>
          <h2 className={styles.shopTitle}>Our Signature Coffees</h2>
          <div className={styles.products}>
            {products.map((product) => {
              return <ProductCard key={product.id} data={product} />;
            })}
          </div>
        </section>
        <section className={styles.infoSection}>
          <h2>Caring Beyond Coffee</h2>
          {Information.map((info, index) => {
            const reversed = index % 2 === 0;
            return <InfoCard key={info.id} data={info} reversed={reversed} />;
          })}
        </section>
        <section className={styles.locationSection}>
          <h2>
            We serve in 4 countries! You can either purchase online or visit one
            of our cafes to taste our specialty coffees crafted with care!
          </h2>
          <ul>
            {countries.map((country) => {
              return (
                <li key={country.title}>
                  <Link href={country.href}>
                    <Image
                      className={styles.flag}
                      src={getImageUrl(country.img)}
                      width={40}
                      height={40}
                      alt={`${country.title} flag`}
                    />
                    {country.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </Container>
    </main>
  );
}
