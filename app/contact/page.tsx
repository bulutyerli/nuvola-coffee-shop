import ContactForm from '../components/ContactForm/ContactForm';
import Container from '../components/Container/Container';
import TitleContainer from '../components/TitleContainer/TitleContainer';
import styles from './contact.module.scss';

export default function ContactPage() {
  return (
    <main>
      <TitleContainer
        title="Contact Us"
        content="Have a question, feedback, or just want to say hello? We’d love to hear from you! Contact us through the form below or reach out directly via email or phone. Our team is here to assist you and ensure you have a delightful experience with Nuvola Coffee Shop."
      />
      <div className={styles.container}>
        <Container>
          <section className={styles.section}>
            <div className={styles.info}>
              <div>
                <h3>Phone:</h3>
                <span>+90 0666-223-21-21</span>
              </div>
              <div>
                <h3>E-Mail:</h3>
                <span>info@nuvolacoffeeshop.com</span>
              </div>
              <div>
                <h3>Address:</h3>
                <span>23 St. Beyoglu, Istanbul / Turkiye</span>
              </div>
            </div>
            <ContactForm />
          </section>
        </Container>
      </div>
    </main>
  );
}
