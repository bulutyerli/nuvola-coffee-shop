import { Address } from '@/src/database-types';
import styles from './addressCard.module.scss';

export default function AddressCard({ address }: { address: Address }) {
  return (
    <div className={styles.addressCard}>
      <div className={styles.addressHeader}>
        <h2 className={styles.addressName}>{address.address_name}</h2>
        <p className={styles.userName}>
          {address.name} {address.surname}
        </p>
      </div>
      <div className={styles.addressDetails}>
        <p>{address.address_line1}</p>
        {address.address_line2 && <p>{address.address_line2}</p>}
        <p>
          {address.city}, {address.state} {address.postal_code}
        </p>
        <p>{address.country}</p>
      </div>
    </div>
  );
}
