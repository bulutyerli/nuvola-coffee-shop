'use client';

import Image from 'next/image';
import styles from './infoCard.module.scss';
import { InfoType } from '@/src/types';
import { useEffect, useRef } from 'react';

export default function InfoCard({
  data,
  reversed,
}: {
  data: InfoType;
  reversed?: boolean;
}) {
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
    <article
      ref={cardRef}
      className={`${styles.container} ${reversed ? styles.reversed : ''}`}
    >
      <div className={styles.texts}>
        <h3>{data.title}</h3>
        <p>{data.desc}</p>
      </div>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={data.img}
          width={300}
          height={300}
          alt={data.title}
        />
      </div>
    </article>
  );
}
