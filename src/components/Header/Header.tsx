'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.scss';
import { FaUser, FaAlignRight, FaTimes } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import Container from '../Container/Container';
import { usePathname } from 'next/navigation';
import Cart from '../Cart/Cart';

export default function Header() {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const navLinks = [
    { title: 'Shop', href: '/shop' },
    { title: 'Our Coffee', href: '/coffee' },
    { title: 'Locations', href: '/locations' },
  ];

  const pathName = usePathname();

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleClickOut = (event: MouseEvent) => {
    const target = event.target;
    if (
      menuRef.current &&
      !(menuRef.current as HTMLElement).contains(target as Node) &&
      target !== menuRef.current
    ) {
      setMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOut);

    return () => {
      document.removeEventListener('mousedown', handleClickOut);
    };
  }, []);

  return (
    <Container color="primary">
      <header
        className={`${styles.header} ${pathName === '/' && styles.homepage}`}
      >
        <Link href="/">
          <Image
            className={styles.logo}
            src={'/logo.svg'}
            alt="nuvola coffee shop logo"
            width={100}
            height={100}
          ></Image>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            {navLinks.map((link) => {
              return (
                <li key={link.href}>
                  <Link href={link.href}>{link.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <ul className={styles.userLinks}>
          <Cart />
          <li>
            <Link href={'/account'}>
              <FaUser className={styles.icons} />
            </Link>
          </li>
          <li onClick={handleMenu} className={styles.hamburger}>
            <FaAlignRight className={styles.icons} />
          </li>
        </ul>
        <ul
          ref={menuRef}
          className={`${styles.hamburgerMenu} ${menu ? styles.open : ''}`}
        >
          <li onClick={handleMenu} className={styles.icons}>
            <FaTimes />
          </li>
          {navLinks.map((link) => {
            return (
              <li key={link.href}>
                <Link href={link.href}>{link.title}</Link>
              </li>
            );
          })}
        </ul>
      </header>
    </Container>
  );
}