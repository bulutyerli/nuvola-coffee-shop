import Container from '../Container/Container';
import styles from './titleContainer.module.scss';

export default function TitleContainer({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </section>
  );
}
