'use client';

import { fetchUserAttributes } from 'aws-amplify/auth';
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

interface UserAttributes {
  name?: string;
  family_name?: string;
  email?: string;
  sub?: string;
}

export default function Account() {
  const [userDetails, setUserDetails] = useState<UserAttributes>({});
  const [userAddresses, setUserAddresses] = useState<Address[] | null>();
  const [newAddress, setNewAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signOut = async () => {
    await handleSignOut();
    router.push('/');
    router.refresh();
  };

  useEffect(() => {
    const getDetails = async () => {
      try {
        const details = await fetchUserAttributes();
        setUserDetails(details);

        if (details.sub) {
          const res = await fetch('/api/addresses');
          if (!res.ok) {
            throw new Error('User info could not fetched');
          }

          const { addresses } = await res.json();
          setUserAddresses(addresses);
        }
      } catch (error) {
        throw new Error('Something went wrong');
      }
    };

    getDetails();
  }, []);

  const handleNewAddress = async (data: Address) => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage =
          errorData.error || 'Addresses could not be fetched';
        throw new Error(errorMessage);
      }

      const result = await res.json();
      setUserAddresses((prev) => [...(prev || []), result.address[0]]);
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
      const res = await fetch('/api/addresses', {
        method: 'PUT',
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage =
          errorData.error || 'Addresses could not be fetched';
        throw new Error(errorMessage);
      }

      const result = await res.json();
      const updatedAddress = result.newAddress;

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
      const res = await fetch(`/api/addresses?address_id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData.error || 'Address could not be deleted';
        throw new Error(errorMessage);
      }

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
        content="Manage your orders and profile information on this page. You can also update or add delivery addresses for your orders."
      />
      <Container color="white">
        <div className={styles.container}>
          <section className={styles.innerContainer}>
            <h2>Profile</h2>
            <div className={styles.user}>
              <p className={styles.name}>
                {userDetails.name} {userDetails.family_name}
              </p>
              <p className={styles.email}>{userDetails.email}</p>
            </div>
            <div className={styles.buttonContainer}>
              <CustomButton
                type="button"
                onClick={() => setNewAddress(true)}
                color="primary"
                text="Add New Address"
              />
              <CustomButton
                type="button"
                text="Sign Out"
                color="red"
                onClick={signOut}
              />
            </div>
            <div className={styles.addressContainer}>
              <h2>Your Addresses</h2>
              {userAddresses?.map((address) => {
                return (
                  <AddressCard
                    updateAddress={updateHandler}
                    deleteAddress={deleteHandler}
                    key={address.id}
                    address={address}
                  />
                );
              })}
            </div>
          </section>
          <section className={styles.innerContainer}>
            <h2 id="orders-heading">Your Orders</h2>
            <ul>
              <li>Order list</li>
            </ul>
          </section>
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
