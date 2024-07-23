'use client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@/src/redux/store';
import { selectAddress, setAddresses } from '@/src/redux/slices/addressSlice';
import { useRouter } from 'next/navigation';

export default function checkoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [clientSecret, setClientSecret] = useState('');
  const { items } = useSelector((state) => state.order);
  const { selectedAddress } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const router = useRouter();

  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  );

  useEffect(() => {
    const getAddresses = async () => {
      const res = await fetch('/api/addresses');
      const result = await res.json();
      dispatch(setAddresses(result.addresses));

      if (result.addresses.length > 0) {
        dispatch(selectAddress(result.addresses[0]));
      }
    };

    getAddresses();
  }, []);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (selectedAddress) {
      fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, address_id: selectedAddress?.id }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch(() => {
          router.push('/');
        });
    }
  }, [selectedAddress]);

  const options = {
    clientSecret,
  };

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
