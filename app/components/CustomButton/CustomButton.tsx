import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import styles from './customButton.module.scss';

export default function CustomButton({
  isLoading,
  text,
}: {
  isLoading: boolean;
  text: string;
}) {
  return (
    <button className={styles.button} type="submit">
      {isLoading ? <LoadingSpinner /> : text}
    </button>
  );
}
