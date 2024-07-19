import Image from 'next/image';
import styles from './smallProductCard.module.scss';
import { CartItem } from '@/src/types';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function SmallProductCard({ data }: { data: CartItem }) {
  return (
    <article className={styles.container}>
      <figure className={styles.imageWrapper}>
        <Image
          src={data.imageUrl}
          width={100}
          height={100}
          alt={data.name}
          className={styles.image}
        />
      </figure>
      <div className={styles.details}>
        <h4 className={styles.name}>{data.name}</h4>
        <p className={styles.option}>{data.option}</p>
        <p className={styles.quantity}>Quantity: {data.quantity}</p>
        <p className={styles.price}>${Number(data.price).toFixed(2)}</p>
      </div>
      <div>
        <RiDeleteBin6Line className={styles.delete} />
      </div>
    </article>
  );
}
