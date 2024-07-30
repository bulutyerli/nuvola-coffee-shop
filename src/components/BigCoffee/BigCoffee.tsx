import { BigCoffeeType } from '@/src/types';
import styles from './bigCoffee.module.scss';
import Image from 'next/image';
import { getImageUrl } from '@/src/utils/getImageUrl';
import Container from '../Container/Container';

export default function BigCoffee({ data }: { data: BigCoffeeType }) {
  return (
    <article className={styles.container}>
      <h2>{data.name}</h2>
      <div className={styles.contentContainer}>
        <Image
          className={styles.image}
          src={getImageUrl(data.imageUrl)}
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
