'use client';

import { BigCoffeeType } from '@/src/types';
import styles from './bigCoffee.module.scss';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function BigCoffee({ data }: { data: BigCoffeeType }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const currentCard = cardRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, []);

  return (
    <article ref={cardRef} className={styles.container}>
      <h2>{data.name}</h2>
      <div className={styles.contentContainer}>
        <Image
          className={styles.image}
          src={data?.imageUrl}
          width={800}
          height={800}
          alt={data.name}
        ></Image>
        <div>
          <div className={styles.firstBlock}>
            <h3>{data.title_1}</h3>
            <p>{data.content_1}</p>
          </div>
          <div className={styles.secondBlock}>
            <h3>{data.title_2}</h3>
            <p>{data.content_2}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
