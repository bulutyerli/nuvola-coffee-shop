import Image from 'next/image';
import Container from '../components/Container/Container';
import TitleContainer from '../components/TitleContainer/TitleContainer';
import styles from './about-us.module.scss';

export default function AboutUsPage() {
  return (
    <main>
      <TitleContainer
        title="About Us"
        content="At our coffee shop, we are dedicated to delivering an extraordinary coffee journey. We meticulously select the highest quality beans, maintain stringent quality control measures, and emphasize eco-friendly practices at every stage of our process."
      />
      <div className={styles.container}>
        <Container>
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
              src="/images/waitress.png"
              alt="barista"
              width={600}
              height={600}
            ></Image>
          </section>
        </Container>
      </div>
    </main>
  );
}
