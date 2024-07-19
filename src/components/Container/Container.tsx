import styles from './container.module.scss';

export default function Container({
  children,
  className,
  color,
}: {
  children: React.ReactNode;
  className?: string;
  color: 'white' | 'primary' | 'brown';
}) {
  return (
    <div className={`${styles.container} ${className} ${styles[color]}`}>
      <div className={styles.innerContainer}>{children}</div>
    </div>
  );
}
