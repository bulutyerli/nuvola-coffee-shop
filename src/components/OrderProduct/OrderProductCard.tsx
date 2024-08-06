import { CartItem } from '@/src/types';
import styles from './orderProductCard.module.scss';
import Image from 'next/image';

export default function OrderProductCard({ item }: { item: CartItem }) {
  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={item.imageUrl}
            width={50}
            height={50}
            alt={item.name}
          />
          <span className={styles.quantity}>{item.quantity}</span>
        </div>
        <div className={styles.titles}>
          <span className={styles.name}>{item.name}</span>
          <span className={styles.option}>{item.option}</span>
        </div>
      </div>
      <span className={styles.price}>${item.price}</span>
    </div>
  );
}
