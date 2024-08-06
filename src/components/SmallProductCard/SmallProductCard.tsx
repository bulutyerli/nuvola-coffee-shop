import Image from 'next/image';
import styles from './smallProductCard.module.scss';
import { CartItem } from '@/src/types';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from '@/src/redux/store';
import { addMore, deleteItem, removeItem } from '@/src/redux/slices/cartSlice';
import { FiMinus, FiPlus } from 'react-icons/fi';

export default function SmallProductCard({ data }: { data: CartItem }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteItem({ id: data.id }));
  };

  const handleAdd = () => {
    dispatch(addMore({ id: data.id }));
  };

  const handleRemove = () => {
    dispatch(removeItem({ id: data.id, quantity: 1 }));
  };

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
        <p className={styles.price}>${Number(data.price).toFixed(2)}</p>
        <div className={styles.quantity}>
          <FiMinus onClick={handleRemove} className={styles.buttons} />
          <span>{data.quantity}</span>
          <FiPlus onClick={handleAdd} className={styles.buttons} />
        </div>
      </div>
      <div>
        <RiDeleteBin6Line onClick={handleDelete} className={styles.delete} />
      </div>
    </article>
  );
}
