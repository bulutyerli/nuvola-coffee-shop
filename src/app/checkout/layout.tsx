'use client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@/src/redux/store';
import { selectAddress, setAddresses } from '@/src/redux/slices/addressSlice';
import { useRouter } from 'next/navigation';
import styles from './checkout.module.scss';
import Link from 'next/link';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { items } = useSelector((state) => state.order);
  const { selectedAddress, addresses } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getAddresses = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/addresses');
        const result = await res.json();
        dispatch(setAddresses(result.addresses));

        if (result.addresses.length > 0) {
          dispatch(selectAddress(result.addresses[0]));
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getAddresses();
  }, [dispatch]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (selectedAddress) {
      fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, address_id: selectedAddress?.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            router.push('/');
          }
        });
    }
  }, [selectedAddress]);

  const options = {
    clientSecret,
  };

  if (loading) {
    return (
      <main className={styles.layout}>
        <p>Loading...</p>
      </main>
    );
  }

  if (addresses.length === 0) {
    return (
      <main className={styles.layout}>
        <p>You must add an address first.</p>
        <p>
          Please go to <Link href="/account">Account</Link> and add your
          address.
        </p>
      </main>
    );
  }

  return (
    <main>
      {clientSecret && (
        <Elements key={clientSecret} options={options} stripe={stripePromise}>
          {children}
        </Elements>
      )}
    </main>
  );
}
