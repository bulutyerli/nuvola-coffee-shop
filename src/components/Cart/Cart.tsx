'use client';

import { useEffect, useRef } from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import styles from './cart.module.scss';
import { RootState, useDispatch, useSelector } from '@/src/redux/store';
import { clearCart, closeCart, toggleCart } from '@/src/redux/slices/cartSlice';
import SmallProductCard from '../SmallProductCard/SmallProductCard';
import Link from 'next/link';
import useCartInitialization from '@/src/lib/useCartInitialization';
import { clearOrder, setOrder } from '@/src/redux/slices/orderSlice';

export default function Cart() {
  const { items, totalPrice, totalItems, isOpen } = useSelector(
    (state: RootState) => state.cart
  );
  const cartRef = useRef(null);
  const dispatch = useDispatch();
  useCartInitialization();

  const handleCartMenu = () => {
    dispatch(toggleCart());
  };

  const handleClickOut = (event: MouseEvent) => {
    const target = event.target;
    if (
      cartRef.current &&
      !(cartRef.current as HTMLElement).contains(target as Node) &&
      target !== cartRef.current
    ) {
      dispatch(closeCart());
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOut);

    return () => {
      document.removeEventListener('mousedown', handleClickOut);
    };
  }, []);

  const handleCartEmpty = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const handleCheckout = () => {
    dispatch(clearOrder());
    dispatch(setOrder({ items, totalPrice }));
    handleCartMenu();
  };

  return (
    <div className={styles.cartContainer}>
      <li onClick={handleCartMenu}>
        <FaShoppingCart className={styles.icons} />
        <div className={styles.cartCount}>{totalItems}</div>
      </li>
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={() => dispatch(closeCart())}
        ></div>
      )}

      <div
        ref={cartRef}
        className={`${styles.cartMenu} ${isOpen ? styles.cartOpen : ''}`}
      >
        <div className={styles.titleContainer}>
          <h2>Your Cart</h2>
          <FaTimes onClick={handleCartMenu} className={styles.closeIcon} />
        </div>
        <div className={styles.innerContainer}>
          <div className={styles.cartItems}>
            {items?.map((item) => {
              return <SmallProductCard key={item.id} data={item} />;
            })}
          </div>
          <div className={styles.cartOptions}>
            <div className={styles.total}>
              <span>Total Item</span>
              <span className={styles.detail}>{totalItems}</span>
            </div>
            <div className={styles.total}>
              <span>Subtotal</span>
              <span className={styles.detail}>{totalPrice} USD</span>
            </div>
            <div onClick={handleCartEmpty} className={styles.empty}>
              Empty Cart
            </div>
            <Link
              onClick={handleCheckout}
              href="/checkout"
              className={styles.checkout}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
