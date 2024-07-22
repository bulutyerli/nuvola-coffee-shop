'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './productCard.module.scss';
import { useDispatch } from '@/src/redux/store';
import { addItem, openCart } from '@/src/redux/slices/cartSlice';
import { GroupedProduct } from '@/src/types';

interface optionType {
  id: number;
  option: string;
  price: number;
}

export default function ProductCard({ data }: { data: GroupedProduct }) {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState<optionType | null>(null);

  useEffect(() => {
    if (data.options && data.options.length > 0) {
      setSelectedOption(data.options[0]);
    }
  }, [data?.options]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = data.options.find(
      (option) => String(option.id) === event.target.value
    );
    if (selected) {
      setSelectedOption(selected);
    }
  };

  const addCartHandle = () => {
    if (selectedOption) {
      dispatch(
        addItem({
          id: selectedOption.id,
          name: data.name,
          option: selectedOption.option,
          price: selectedOption.price,
          imageUrl: data.imageUrl,
          quantity: 1,
        })
      );
      dispatch(openCart());
    }
  };

  return (
    <article className={styles.container}>
      <figure className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}${data.imageUrl}`}
          width={150}
          height={150}
          alt={`${data.name} image`}
        />
      </figure>
      <div className={styles.innerContainer}>
        <div className={styles.productInfo}>
          <span className={styles.brand}>{data.brand}</span>
          <h3 className={styles.name}>{data.name}</h3>
          <span className={styles.category}>{data.category}</span>
        </div>
        <select
          id={`options-${data.name}`}
          className={styles.options}
          onChange={handleOptionChange}
          value={selectedOption?.id ?? ''}
        >
          {data.options.map((item) => (
            <option key={item.id} value={item.id}>
              {item.option}
            </option>
          ))}
        </select>

        <div className={styles.cartGroup}>
          <span className={styles.price}>{selectedOption?.price ?? 0} USD</span>
          <button
            onClick={addCartHandle}
            type="button"
            className={styles.addToCartButton}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </article>
  );
}
