'use client';

import { fetchUserAttributes } from 'aws-amplify/auth';
import Container from '../../components/Container/Container';
import TitleContainer from '../../components/TitleContainer/TitleContainer';
import styles from './account.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleSignOut } from '@/src/lib/cognitoActions';
import { getAddresses } from '@/src/services/getAddresses';
import AddressCard from '@/src/components/AddressCard/AddressCard';
import { Address } from '@/src/database-types';

interface UserAttributes {
  name?: string;
  family_name?: string;
  email?: string;
  sub?: string;
}

export default function Account() {
  const [userDetails, setUserDetails] = useState<UserAttributes>({});
  const [userAddresses, setUserAddresses] = useState<Address[] | null>();
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
          const addresses = await getAddresses(details.sub);
          setUserAddresses(addresses);
        }
      } catch (error) {
        console.error('Error fetching user details or addresses:', error);
      }
    };

    getDetails();
  }, []);

  console.log(userAddresses);

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
              <button className={styles.addressButton} type="button">
                Add New Address
              </button>
              <button
                className={styles.signOutButton}
                onClick={signOut}
                type="button"
              >
                Logout
              </button>
            </div>
            <div className={styles.addressContainer}>
              <h2>Your Addresses</h2>
              {userAddresses?.map((address) => {
                return <AddressCard key={address.id} address={address} />;
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
    </main>
  );
}
