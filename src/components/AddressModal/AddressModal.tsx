'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './addressModal.module.scss';
import { Address } from '@/src/database-types';
import { IoMdClose } from 'react-icons/io';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema } from '@/src/schemas/address';
import CustomButton from '../CustomButton/CustomButton';

export default function AddressModal({
  onClose,
  address,
  onSubmitAddress,
  isLoading,
}: {
  onClose: () => void;
  address?: Address;
  onSubmitAddress: (address: Address) => void;
  isLoading?: boolean;
}) {
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<Address>({
    resolver: zodResolver(addressSchema),
    defaultValues: address || {},
  });

  const onSubmit = () => {
    onSubmitAddress(getValues());
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.container}>
        <h2>Address</h2>
        <IoMdClose className={styles.closeButton} onClick={onClose} />
        <form>
          <div className={styles.input}>
            <label htmlFor="address_name">Address Title:</label>
            <input
              id="address_name"
              type="text"
              {...register('address_name')}
              placeholder="Address Title"
            />
            {errors.address_name && (
              <p className={styles.error}>{errors.address_name.message}</p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.input}>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                {...register('name')}
                placeholder="Name"
              />
              {errors.name && (
                <p className={styles.error}>{errors.name.message}</p>
              )}
            </div>
            <div className={styles.input}>
              <label htmlFor="surname">Surname:</label>
              <input
                id="surname"
                type="text"
                {...register('surname')}
                placeholder="Surname"
              />
              {errors.surname && (
                <p className={styles.error}>{errors.surname.message}</p>
              )}
            </div>
          </div>
          <div className={styles.input}>
            <label htmlFor="address_line1">Address 1:</label>
            <input
              id="address_line1"
              type="text"
              {...register('address_line1')}
              placeholder="Address 1"
            />
            {errors.address_line1 && (
              <p className={styles.error}>{errors.address_line1.message}</p>
            )}
          </div>
          <div className={styles.input}>
            <label htmlFor="address_line2">Address 2 (Optional):</label>
            <input
              id="address_line2"
              type="text"
              {...register('address_line2')}
              placeholder="Address 2"
            />
            {errors.address_line2 && (
              <p className={styles.error}>{errors.address_line2.message}</p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.input}>
              <label htmlFor="postal_code">Postal Code:</label>
              <input
                id="postal_code"
                type="text"
                {...register('postal_code')}
                placeholder="Postal Code"
              />
              {errors.postal_code && (
                <p className={styles.error}>{errors.postal_code.message}</p>
              )}
            </div>
            <div className={styles.input}>
              <label htmlFor="city">City:</label>
              <input
                id="city"
                type="text"
                {...register('city')}
                placeholder="City"
              />
              {errors.city && (
                <p className={styles.error}>{errors.city.message}</p>
              )}
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.input}>
              <label htmlFor="state">State:</label>
              <input
                id="state"
                type="text"
                {...register('state')}
                placeholder="State"
              />
              {errors.state && (
                <p className={styles.error}>{errors.state.message}</p>
              )}
            </div>
            <div className={styles.input}>
              <label htmlFor="country">Country:</label>
              <input
                id="country"
                type="text"
                {...register('country')}
                placeholder="Country"
              />
              {errors.country && (
                <p className={styles.error}>{errors.country.message}</p>
              )}
            </div>
          </div>
        </form>
        <CustomButton
          onClick={onSubmit}
          type="button"
          color="primary"
          text="Save"
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
