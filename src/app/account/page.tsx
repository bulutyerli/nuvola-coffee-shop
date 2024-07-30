'use client';

import Container from '../../components/Container/Container';
import TitleContainer from '../../components/TitleContainer/TitleContainer';
import styles from './account.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleSignOut } from '@/src/lib/cognitoActions';
import AddressCard from '@/src/components/AddressCard/AddressCard';
import { Address } from '@/src/database-types';
import CustomButton from '@/src/components/CustomButton/CustomButton';
import AddressModal from '@/src/components/AddressModal/AddressModal';
import {
  addNewAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from '@/src/services/addressService';
import { FaPlus } from 'react-icons/fa';
import LoadingSpinner from '@/src/components/LoadingSpinner/LoadingSpinner';
import { RootState, useDispatch, useSelector } from '@/src/redux/store';
import { signOutUser } from '@/src/redux/slices/authSlice';

interface UserAttributes {
  name?: string;
  family_name?: string;
  email?: string;
  sub?: string;
}

export default function Account() {
  const [userAddresses, setUserAddresses] = useState<Address[] | null>();
  const [newAddress, setNewAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  const signOut = async () => {
    await dispatch(signOutUser());
  };

  useEffect(() => {
    const getDetails = async () => {
      try {
        if (user?.sub) {
          const addresses = await getAddresses();
          setUserAddresses(addresses);
        }
      } catch (error) {
        throw new Error('Something went wrong');
      }
    };

    getDetails();
  }, [user]);

  const handleNewAddress = async (data: Address) => {
    try {
      setIsLoading(true);
      await addNewAddress(data);
      const tempId = userAddresses ? userAddresses?.length + 1 : 1;
      const addressWithTempId = { ...data, id: tempId };
      setUserAddresses((prev) => [...(prev || []), addressWithTempId]);
      setNewAddress(false);
    } catch (error: any) {
      if (error.message === 'Missing required fields') {
        alert('Please fill in all required fields.');
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateHandler = async (data: Address) => {
    try {
      const updatedAddress = await updateAddress(data);

      setUserAddresses((prev) =>
        prev?.map((address) =>
          address.id === updatedAddress.id ? updatedAddress : address
        )
      );
    } catch (error: any) {
      alert(error.message || 'Something went wrong. Please try again later.');
    }
  };

  const deleteHandler = async (id: number) => {
    try {
      await deleteAddress(id);

      setUserAddresses((prev) =>
        prev ? prev.filter((address) => address.id !== id) : prev
      );
    } catch (error: any) {
      alert(error.message || 'Something went wrong. Please try again later.');
    }
  };

  return (
    <main>
      <TitleContainer
        title="Account Details"
        content="Check your name and e-mail address, Manage your addresses for your orders."
      />
      <Container color="white">
        <div className={styles.container}>
          <div className={styles.user}>
            <p className={styles.name}>
              {user?.name} {user?.family_name}
            </p>
            <p className={styles.email}>{user?.email}</p>
          </div>
          <div className={styles.buttonContainer}>
            <CustomButton
              type="button"
              text="Sign Out"
              color="red"
              onClick={signOut}
            />
          </div>
          <h2>My Addresses</h2>
          <div className={styles.addressContainer}>
            <div
              onClick={() => setNewAddress(true)}
              className={styles.newAddress}
            >
              <FaPlus />
              <span>ADD NEW ADDRESS</span>
            </div>
            {userAddresses?.length ? (
              userAddresses.map((address) => (
                <AddressCard
                  updateAddress={updateHandler}
                  deleteAddress={deleteHandler}
                  key={address.id}
                  address={address}
                  editable={true}
                />
              ))
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
      </Container>
      {newAddress && (
        <AddressModal
          isLoading={isLoading}
          onSubmitAddress={handleNewAddress}
          onClose={() => setNewAddress(false)}
        />
      )}
    </main>
  );
}
