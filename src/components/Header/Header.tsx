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
  const [menu, setMenu] = useState<boolean>(false);
  const menuRef = useRef(null);
  const [accountMenu, setAccountMenu] = useState<boolean>(false);
  const navLinks = [
    { title: 'Our Coffee', href: '/coffee' },
    { title: 'Locations', href: '/locations' },
    { title: 'About Us', href: '/about-us' },
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

  useEffect(() => {
    if (menu) {
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [menu]);

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
          <li className={styles.userIcon}>
            <FaUser className={styles.icons} />
            <div
              className={`${styles.userMenu} ${
                accountMenu ? styles.accountOpen : ''
              }`}
            >
              <Link href="/account">My Account</Link>
              <Link href="/orders">My Orders</Link>
            </div>
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
                <Link onClick={handleMenu} href={link.href}>
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </header>
    </Container>
  );
}
