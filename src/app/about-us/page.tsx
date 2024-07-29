import Image from 'next/image';
import Container from '../../components/Container/Container';
import TitleContainer from '../../components/TitleContainer/TitleContainer';
import styles from './about-us.module.scss';
import { getImageUrl } from '@/src/utils/getImageUrl';

export default function AboutUsPage() {
  return (
    <main>
      <TitleContainer
        title="About Us"
        content="At our coffee shop, we are dedicated to delivering an extraordinary coffee journey. We meticulously select the highest quality beans, maintain stringent quality control measures, and emphasize eco-friendly practices at every stage of our process."
      />
      <div className={styles.container}>
        <Container color="white">
          <section className={styles.section_one}>
            <div>
              <div>
                <h2>Welcome to Nuvola Coffee Shop</h2>
                <p>
                  Step into the world of extraordinary coffee at Nuvola Coffee
                  Shop. We invite you to indulge in a sensory journey that
                  celebrates the artistry and passion behind every cup. From the
                  moment our beans are carefully selected to the final sip of
                  your favorite brew, we are committed to delivering an
                  unparalleled coffee experience.
                </p>
              </div>
              <div>
                <h2>Our Commitment to Quality</h2>
                <p>
                  At Nuvola Coffee Shop, quality is at the heart of everything
                  we do. We meticulously source the finest beans from renowned
                  coffee regions across the globe, ensuring that each batch
                  meets our rigorous standards of excellence. Our dedicated team
                  of roasters skillfully crafts every roast to highlight the
                  unique flavors and characteristics of each bean, from earthy
                  tones to vibrant fruity notes.
                </p>
              </div>
              <div>
                <h2>Crafting Perfect Moments</h2>
                <p>
                  Embrace the pleasure of brewing your own coffee with our
                  diverse range of brewing methods. Whether you prefer the rich,
                  full-bodied flavors of a classic French press or the precision
                  and depth of an espresso shot, our selection of brewing
                  techniques caters to every preference and skill level. Become
                  your own barista and explore the endless possibilities of
                  coffee craftsmanship with us.
                </p>
              </div>
            </div>
            <Image
              className={styles.waitress}
              src={getImageUrl('/products/waitress.webp')}
              alt="barista"
              width={600}
              height={600}
            ></Image>
          </section>
          <section className={styles.section_two}>
            <div className={styles.content}>
              <Image
                className={styles.images}
                src={getImageUrl('/products/coffeeblend.webp')}
                width={300}
                height={300}
                alt="blending coffee"
              />
              <div>
                <h2>Discover the World of Coffee</h2>
                <p>
                  Embark on a journey through the rich tapestry of coffee
                  flavors from around the world. Experience the unique profiles
                  of beans from different regions, each offering its own story.
                  Whether it&apos;s the robust, earthy tones of South American
                  coffee or the bright, citrusy notes of East African blends,
                  every sip is an adventure waiting to be explored. Coffee is
                  not just a drink; it&apos;s an experience that brings people
                  together. Whether you’re savoring a quiet moment alone or
                  enjoying lively conversations with friends, coffee creates
                  moments of connection and joy. At our coffee house, we are
                  dedicated to providing an unparalleled coffee experience. We
                  meticulously source the highest quality beans, maintain strict
                  standards, and focus on sustainability throughout our entire
                  process. Each cup we serve is a reflection of our commitment
                  to excellence and our passion for this exceptional beverage.
                </p>
              </div>
            </div>
            <div className={styles.content}>
              <Image
                className={styles.images}
                src={getImageUrl('/products/beans.webp')}
                width={300}
                height={300}
                alt="coffee beans"
              />
              <div>
                <h2>An Odyssey in Brewing Mastery</h2>
                <p>
                  Dive into the world of perfect brewing as we take you through
                  various methods that bring out the best in each coffee bean.
                  From the delicate balance of a pour-over to the bold intensity
                  of an espresso, we offer the expertise and tools to create
                  your ideal cup. Delight in a range of flavors from our diverse
                  selection. Whether it’s the smooth, chocolatey richness of a
                  dark roast or the bright, fruity notes of a single-origin
                  coffee, we have something to satisfy every palate. Every sip
                  is an exploration, revealing the intricate layers that make
                  each coffee unique. Our diverse offerings are perfect for any
                  occasion, elevating your coffee experience to new heights.
                  Embrace the rituals that turn a simple cup of coffee into a
                  moment of pure indulgence and bliss.
                </p>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </main>
  );
}
