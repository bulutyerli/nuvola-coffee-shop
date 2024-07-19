'use client';

import { useEffect, useRef } from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import styles from './cart.module.scss';
import { useDispatch, useSelector } from '@/src/redux/store';
import { closeCart, toggleCart } from '@/src/redux/slices/cartSlice';
import SmallProductCard from '../SmallProductCard/SmallProductCard';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartState = useSelector((state) => state.cart.isOpen);
  const cartRef = useRef(null);
  const dispatch = useDispatch();

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
  });

  return (
    <div className={styles.cartContainer}>
      <li onClick={handleCartMenu}>
        <FaShoppingCart className={styles.icons} />
        <div className={styles.cartCount}>{cartItems.length}</div>
      </li>
      {cartState && (
        <div
          className={styles.overlay}
          onClick={() => dispatch(closeCart())}
        ></div>
      )}

      <div
        ref={cartRef}
        className={`${styles.cartMenu} ${cartState ? styles.cartOpen : ''}`}
      >
        <div className={styles.titleContainer}>
          <h2>Your Cart</h2>
          <FaTimes onClick={handleCartMenu} className={styles.closeIcon} />
        </div>
        <div className={styles.cartItems}>
          {cartItems.map((item) => {
            return <SmallProductCard key={item.id} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
