import BigCoffee from '@/src/components/BigCoffee/BigCoffee';
import styles from './coffee.module.scss';
import { BigCoffeeType } from '@/src/types';
import Container from '@/src/components/Container/Container';
import TitleContainer from '@/src/components/TitleContainer/TitleContainer';
import { getProducts } from '@/src/services/getProducts';
import ProductCard from '@/src/components/ProductCard/ProductCard';

const coffeeData: BigCoffeeType[] = [
  {
    id: 1,
    name: 'Nuvola Coffee Brazil',
    title_1: 'Where Tradition Meets Excellence',
    content_1:
      'Indulge in the essence of Brazil with every velvety sip of our standard Brazilian coffee. Our beans are meticulously sourced from the sun-drenched coffee plantations that stretch across the picturesque landscapes of Brazil. With notes of caramel, nutmeg, and subtle hints of citrus, our coffee is the embodiment of Brazilian excellence.',
    title_2: 'Choose Your Brew',
    content_2:
      "Whether you prefer the intensity of a velvety espresso, the delight of a frothy cappuccino, or the refreshment of a smooth cold brew, each cup is a homage to Brazil's finest coffee traditions.",
    imageUrl: '/images/brazil-big.webp',
  },
  {
    id: 2,
    name: 'Nuvola Coffee Columbia',
    title_1: 'Discover the Heart of the Andes',
    content_1:
      'Embark on a sensory journey with each sip of our Colombian coffee, a true testament to the soul of the Andes Mountains. Our beans are carefully harvested from the lush, green slopes of Colombia, where the altitude and climate create a coffee like no other. With a flavor profile characterized by rich dark chocolate undertones, a subtle smokiness, and a hint of bright tropical fruits, our coffee embodies the spirit of Colombia.',
    title_2: 'Craft Your Experience',
    content_2:
      "Whether you seek the warmth of a traditional Colombian 'tinto' the boldness of a cortado, or the exotic allure of a café de olla, each cup is a gateway to the Colombian coffee culture, celebrated for its diverse flavors and unique brewing methods.",
    imageUrl: '/images/columbia-big.webp',
  },
  {
    id: 3,
    name: 'Nuvola Coffee Mexico',
    title_1: 'The Magic of Chiapas',
    content_1:
      'Transport your senses to the mystical landscapes of Chiapas, Mexico, where our coffee is born. Each cup is a sip of enchantment, a taste of the ancient traditions that echo through the lush coffee groves.',
    title_2: 'Sip into Serenity',
    content_2:
      'Indulge in the serenity of Mexican coffee, where each sip carries the wisdom of generations. Whether you choose the velvety embrace of espresso, the harmonious notes of cappuccino, or the refreshing simplicity of cold brew, each cup is a tribute to the Chiapas tradition.',
    imageUrl: '/images/mexico-big.webp',
  },
  {
    id: 4,
    name: 'Nuvola Coffee Ethiopia',
    title_1: 'Awaken Your Senses with Ethiopia',
    content_1:
      "Embark on a sensory adventure with every sip of our Ethiopian coffee, a reflection of the country's rich coffee heritage. Our beans are carefully cultivated in the highlands of Ethiopia, the birthplace of coffee. With a flavor profile that dances between floral notes, bright citrusy acidity, and a deep, earthy body, our coffee pays homage to Ethiopia's ancient coffee traditions.",
    title_2: 'Experience Authenticity',
    content_2:
      "Whether you prefer the simplicity of a traditional Ethiopian coffee ceremony, the exotic allure of a spicy Yirgacheffe, or the boldness of a Sidamo espresso, each cup transports you to the heart of Ethiopia's coffee culture, where coffee is more than a drink; it's a way of life.",
    imageUrl: '/images/ethiopia-big.webp',
  },
];

export default async function CoffeePage() {
  const products = await getProducts();

  return (
    <>
      <TitleContainer
        title="Explore Our Coffee Collection"
        content="Welcome to Nuvola Coffee's exquisite selection of specialty coffees from around the world. Each variety is carefully crafted to bring out the unique flavors and traditions of its origin. 
"
      />
      <Container color="white">
        <main className={styles.container}>
          {coffeeData.map((data, index) => (
            <div key={data.id} className={styles.cardContainer}>
              <BigCoffee data={data} />
              {index < coffeeData.length - 1 && (
                <div className={styles.divider} />
              )}
            </div>
          ))}

          <section className={styles.shopSection}>
            <h2 className={styles.shopTitle}>Buy Now!</h2>
            <div className={styles.products}>
              {products.map((product) => {
                return (
                  <ProductCard
                    color="secondary"
                    key={product.id}
                    data={product}
                  />
                );
              })}
            </div>
          </section>
        </main>
      </Container>
    </>
  );
}
