'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './productCard.module.scss';
import { useDispatch } from '@/app/redux/store';
import { addItem, openCart } from '@/app/redux/slices/cartSlice';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface optionType {
  id: string;
  option: string;
  price: number;
}

export default function ProductCard({
  name,
  image,
  options,
  category,
  brand,
}: {
  name: string;
  image: string;
  options: optionType[];
  category: string;
  brand: string;
}) {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState<optionType | null>(null);

  useEffect(() => {
    if (options && options.length > 0) {
      setSelectedOption(options[0]);
    }
  }, [options]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = options.find((option) => option.id === event.target.value);
    if (selected) {
      setSelectedOption(selected);
    }
  };

  const addCartHandle = () => {
    if (selectedOption) {
      dispatch(
        addItem({
          id: selectedOption.id,
          name: name,
          option: selectedOption.option,
          price: selectedOption.price,
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
          src={image}
          width={150}
          height={150}
          alt={`${name} image`}
        />
      </figure>
      <div className={styles.innerContainer}>
        <div className={styles.productInfo}>
          <span className={styles.brand}>{brand}</span>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.category}>{category}</span>
        </div>
        <select
          id={`options-${name}`}
          className={styles.options}
          onChange={handleOptionChange}
          value={selectedOption?.id ?? ''}
        >
          {options.map((item) => (
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
