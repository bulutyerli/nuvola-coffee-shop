'use client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import CheckoutForm from '@/src/components/CheckoutForm/CheckoutForm';
import styles from './checkout.module.scss';
import { useDispatch, useSelector } from '@/src/redux/store';
import { Address } from '@/src/database-types';
import Container from '@/src/components/Container/Container';
import AddressCard from '@/src/components/AddressCard/AddressCard';
import SmallProductCard from '@/src/components/SmallProductCard/SmallProductCard';
import { selectAddress, setAddresses } from '@/src/redux/slices/addressSlice';
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [clientSecret, setClientSecret] = useState('');
  const { items } = useSelector((state) => state.cart);
  const { selectedAddress } = useSelector((state) => state.address);
  const dispatch = useDispatch();

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
        .then((data) => setClientSecret(data.clientSecret));
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
