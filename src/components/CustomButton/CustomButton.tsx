import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import styles from './customButton.module.scss';

export default function CustomButton({
  isLoading,
  text,
  color,
  className,
  onClick,
  type,
}: {
  isLoading?: boolean;
  text: string;
  color: 'primary' | 'secondary' | 'red';
  className?: string;
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className} ${styles[color]}`}
      type="submit"
    >
      {isLoading ? <LoadingSpinner /> : text}
    </button>
  );
}
