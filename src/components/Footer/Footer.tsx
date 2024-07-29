import Image from 'next/image';
import styles from './footer.module.scss';
import Link from 'next/link';
import { FaInstagram, FaSquareXTwitter, FaFacebook } from 'react-icons/fa6';
import Container from '../Container/Container';
import { getImageUrl } from '@/src/utils/getImageUrl';

export default function Footer() {
  const copyright = new Date().getFullYear();

  const shopLinks = [
    {
      title: 'Our Coffee',
      href: '/coffee',
    },
    {
      title: 'Locations',
      href: '/locations',
    },
  ];

  const links = [
    {
      title: 'About Us',
      href: '/about-us',
    },
    {
      title: 'Contact Us',
      href: '/contact',
    },
    {
      title: 'Privacy Policy',
      href: '/privacy-policy',
    },
  ];

  const socials = [
    {
      title: 'facebook',
      href: 'https://www.facebook.com',
      icon: <FaFacebook />,
    },
    {
      title: 'twitter',
      href: 'https://twitter.com',
      icon: <FaSquareXTwitter />,
    },
    {
      title: 'instagram',
      href: 'https://www.instagram.com',
      icon: <FaInstagram />,
    },
  ];
  return (
    <Container className={styles.container} color="primary">
      <footer className={styles.footer}>
        <div className={`${styles.logoContainer} ${styles.grid_1}`}>
          <Image
            className={styles.logo}
            src={'/logo.svg'}
            alt="nuvola coffee shop logo"
            width={100}
            height={100}
          ></Image>
          <span>
            Nuvola <br /> Coffee Shop
          </span>
        </div>
        <ul className={styles.grid_2}>
          <h3>Shopping</h3>
          {shopLinks.map((link) => {
            return (
              <li key={link.href}>
                <Link href={link.href}>{link.title}</Link>
              </li>
            );
          })}
        </ul>
        <ul className={styles.grid_3}>
          <h3>Account</h3>
          {links.map((link) => {
            return (
              <li key={link.href}>
                <Link href={link.href}>{link.title}</Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.grid_4}>
          <h3>Socials</h3>
          <ul className={styles.icons}>
            {socials.map((link) => {
              return (
                <li key={link.title}>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={link.href}
                  >
                    {link.icon}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span>&copy; {copyright} Bulut Yerli</span>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src={getImageUrl('/products/footer-beans.webp')}
            width={200}
            height={200}
            alt="footer coffee beans"
          ></Image>
        </div>
      </footer>
    </Container>
  );
}
