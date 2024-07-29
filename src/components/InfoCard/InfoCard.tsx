import Image from 'next/image';
import styles from './infoCard.module.scss';
import { getImageUrl } from '@/src/utils/getImageUrl';
import { InfoType } from '@/src/types';

export default function InfoCard({
  data,
  reversed,
}: {
  data: InfoType;
  reversed?: boolean;
}) {
  return (
    <article
      className={`${styles.container} ${reversed ? styles.reversed : ''}`}
    >
      <div className={styles.texts}>
        <h3>{data.title}</h3>
        <p>{data.desc}</p>
      </div>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={getImageUrl(data.img)}
          width={300}
          height={300}
          alt={data.title}
        />
      </div>
    </article>
  );
}
