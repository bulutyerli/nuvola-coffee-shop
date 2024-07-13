import Container from '../components/Container/Container';
import TitleContainer from '../components/TitleContainer/TitleContainer';
import styles from './privacy-policy.module.scss';

export default function PrivacyPolicyPage() {
  return (
    <main>
      <TitleContainer
        title="Privacy Policy"
        content="Our Privacy Policy outlines how we collect, use, and protect your personal information. We respect your privacy and are committed to transparency and security in handling your data. We collect information to enhance your experience and provide personalized services while ensuring your data is safeguarded against unauthorized access or disclosure."
      />
      <div className={styles.section}>
        <Container>
          <section className={styles.policy}>
            <p>
              When you visit our website, we automatically collect certain
              information about your device, such as your browser type, IP
              address, time zone, and installed cookies. Additionally, as you
              browse our site, we gather data on the pages you view, the links
              that brought you here, and how you interact with our content. We
              refer to this as “Device Information.”
            </p>
            <p>
              When you make or attempt to make a purchase through our site, we
              collect personal details such as your name, billing and shipping
              addresses, payment information, email address, and phone number.
              This is referred to as “Order Information.” In this policy,
              “Personal Information” includes both Device Information and Order
              Information.
            </p>
            <h2>Usage of Personal Information</h2>
            <h3>Order Information:</h3>
            <ul>
              <li>
                Process and complete your purchases, including handling
                payments, shipping, and providing order confirmations.
              </li>
              <li>Communicate with you about your order.</li>
              <li>Verify orders for potential risks or fraudulent activity.</li>
              <li>
                Share updates and promotions about our products and services, as
                per your communication preferences.
              </li>
            </ul>
            <h3>Device Information:</h3>
            <ul>
              <li>Detect and prevent potential fraud and security threats.</li>
              <li>
                Enhance and improve our website’s functionality and user
                experience.
              </li>
              <li>
                Analyze user interactions to assess the effectiveness of our
                marketing and advertising strategies.
              </li>
            </ul>
          </section>
        </Container>
      </div>
    </main>
  );
}
