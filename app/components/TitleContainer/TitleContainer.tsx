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
    <Container color="primary">
      <section className={styles.content}>
        <h1>{title}</h1>
        <p>{content}</p>
      </section>
    </Container>
  );
}
