'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.scss';
import { FaUser, FaAlignRight, FaTimes } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import Container from '../Container/Container';
import { usePathname, useRouter } from 'next/navigation';
import Cart from '../Cart/Cart';
import { RootState, dispatch, useSelector } from '@/src/redux/store';
import { fetchUser, signOutUser } from '@/src/redux/slices/authSlice';
import { Hub } from 'aws-amplify/utils';
import { fetchUserAttributes } from 'aws-amplify/auth';

export default function Header() {
  const [menu, setMenu] = useState<boolean>(false);
  const [accountMenu, setAccountMenu] = useState<boolean>(false);
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const menuRef = useRef(null);
  const accountMenuRef = useRef(null);
  const pathName = usePathname();
  const router = useRouter();
  const navLinks = [
    { title: 'Our Coffee', href: '/coffee' },
    { title: 'Locations', href: '/locations' },
    { title: 'About Us', href: '/about-us' },
  ];
  const getUser = async () => {
    await dispatch(fetchUser());
    const user = await fetchUserAttributes();
  };
  useEffect(() => {
    const unsubscribe = Hub.listen('auth', async ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          await getUser();
          break;
        case 'signedOut':
          router.push('/auth/sign-in');
          break;
      }
    });
    getUser();

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  useEffect(() => {
    getUser();
  }, []);

  const signOut = async () => {
    await dispatch(signOutUser());
    setAccountMenu(false);
  };

  const handleAccountMenu = () => {
    if (isAuth) {
      setAccountMenu(!accountMenu);
    } else {
      router.push('/auth/sign-in');
    }
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleClickOut = (event: MouseEvent) => {
    const target = event.target;
    if (
      menu &&
      menuRef.current &&
      !(menuRef.current as HTMLElement).contains(target as Node) &&
      target !== menuRef.current
    ) {
      setMenu(false);
    }

    if (
      accountMenu &&
      accountMenuRef.current &&
      !(accountMenuRef.current as HTMLElement).contains(target as Node) &&
      target !== accountMenuRef.current
    ) {
      setAccountMenu(false);
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
            <FaUser onClick={handleAccountMenu} className={styles.icons} />
            <div
              ref={accountMenuRef}
              className={`${styles.userMenu} ${
                accountMenu ? styles.accountOpen : ''
              }`}
            >
              <Link onClick={handleAccountMenu} href="/account">
                My Account
              </Link>
              <Link onClick={handleAccountMenu} href="/orders">
                My Orders
              </Link>
              <span onClick={signOut} className={styles.signOut}>
                Sign Out
              </span>
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
