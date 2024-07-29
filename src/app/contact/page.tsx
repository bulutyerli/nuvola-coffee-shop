import ContactForm from '../../components/ContactForm/ContactForm';
import Container from '../../components/Container/Container';
import TitleContainer from '../../components/TitleContainer/TitleContainer';
import styles from './contact.module.scss';
import { IoLocationSharp } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <>
      <TitleContainer
        title="Contact Us"
        content="Have a question, feedback, or just want to say hello? We’d love to hear from you! Contact us through the form below or reach out directly via email or phone. Our team is here to assist you and ensure you have a delightful experience with Nuvola Coffee Shop."
      />
      <section className={styles.section}>
        <div className={styles.info}>
          <div>
            <h3>Phone:</h3>
            <div className={styles.iconContainer}>
              <FaPhoneAlt className={styles.icon} />
              <span>+90 0666-223-21-21</span>
            </div>
          </div>
          <div>
            <h3>E-Mail:</h3>
            <div className={styles.iconContainer}>
              <MdEmail className={styles.icon} />
              <span>info@nuvolacoffeeshop.com</span>
            </div>
          </div>
          <div>
            <h3>Address:</h3>
            <div className={styles.iconContainer}>
              <IoLocationSharp className={styles.icon} />
              <span>23 St. Beyoglu, Istanbul / Turkiye</span>
            </div>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
