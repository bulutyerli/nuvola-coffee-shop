import styles from './page.module.scss';
import Hero from './components/Hero/Hero';
import Container from './components/Container/Container';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from './components/ProductCard/ProductCard';

export default function Home() {
  const countries = [
    {
      title: 'Istanbul / Türkiye',
      href: '/locations#1',
      img: '/images/turkey.png',
    },
    {
      title: 'Athens / Greece',
      href: '/locations#2',
      img: '/images/greece.png',
    },
    {
      title: 'New York / USA',
      href: '/locations#3',
      img: '/images/usa.png',
    },
    {
      title: 'London / UK',
      href: '/locations#4',
      img: '/images/uk.png',
    },
  ];
  return (
    <main className={styles.main}>
      <Hero />
      <Container color="primary">
        <section className={styles.shopSection}>
          <h2 className={styles.shopTitle}>Our Signature Coffees</h2>
          <ProductCard
            options={[
              { id: '1', option: '250g', price: 50 },
              { id: '2', option: '500g', price: 90 },
            ]}
            name="Coffee 1"
            image="/images/columbia-pack.png"
            category="Coffee"
            brand="Nuvola Coffee Shop"
          />
        </section>
        <section className={styles.section}>
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
                      src={country.img}
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
