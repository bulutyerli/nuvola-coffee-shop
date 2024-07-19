'use client';

import { fetchUserAttributes } from 'aws-amplify/auth';
import Container from '../../components/Container/Container';
import TitleContainer from '../../components/TitleContainer/TitleContainer';
import { handleSignOut } from '../lib/cognitoActions';
import styles from './account.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserAttributes {
  name?: string;
  family_name?: string;
  email?: string;
}

export default function Account() {
  const [userDetails, setUserDetails] = useState<UserAttributes>({});
  const router = useRouter();

  const signOut = async () => {
    await handleSignOut();
    router.push('/');
    router.refresh();
  };

  useEffect(() => {
    const getDetails = async () => {
      const details = await fetchUserAttributes();
      setUserDetails(details);
    };

    getDetails();
  }, []);

  console.log(userDetails.name);

  return (
    <main>
      <TitleContainer
        title="Account Details"
        content="Manage your orders and profile information on this page. You can also update or add delivery addresses for your orders."
      />
      <Container color="white">
        <div className={styles.container}>
          <section
            className={styles.innerContainer}
            aria-labelledby="profile-heading"
          >
            <h2 id="profile-heading">Profile</h2>
            <div className={styles.user}>
              <p>
                {userDetails.name} {userDetails.family_name}
              </p>
              <p>{userDetails.email}</p>
            </div>
            <button type="button">Change Address</button>
            <button onClick={signOut} type="button">
              Logout
            </button>
          </section>
          <section
            className={styles.innerContainer}
            aria-labelledby="orders-heading"
          >
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
