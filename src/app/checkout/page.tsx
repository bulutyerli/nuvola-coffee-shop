'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import CheckoutForm from '@/src/components/CheckoutForm/CheckoutForm';
import styles from './checkout.module.scss';
import { useSelector } from '@/src/redux/store';
import { Address } from '@/src/database-types';
import Container from '@/src/components/Container/Container';
import AddressCard from '@/src/components/AddressCard/AddressCard';
import SmallProductCard from '@/src/components/SmallProductCard/SmallProductCard';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const { items, totalPrice, totalItems } = useSelector((state) => state.cart);
  const [addresses, setAddresses] = useState<Address[] | []>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  );

  useEffect(() => {
    const getAddresses = async () => {
      const res = await fetch('/api/addresses');
      const result = await res.json();
      setAddresses(result.addresses);

      if (result.addresses.length > 0) {
        setSelectedAddress(result.addresses[0]);
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

  const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAddressId = event.target.value;
    const address = addresses.find(
      (address) => address.id === parseInt(selectedAddressId)
    );

    if (address) {
      setSelectedAddress(address);
    }
  };

  return (
    <Container className={styles.main} color="white">
      <h1>Checkout</h1>
      <div className={styles.container}>
        <div className={styles.paymentContainer}>
          <section className={styles.addressSection}>
            <h2>Deliver To:</h2>
            <select
              name="addresses"
              id="address"
              onChange={handleAddressChange}
              value={selectedAddress?.id || ''}
            >
              {addresses.map((address) => {
                return (
                  <option key={address.id} value={address.id}>
                    {address.address_name}
                  </option>
                );
              })}
            </select>
            {selectedAddress && <AddressCard address={selectedAddress} />}
          </section>
          <section className={styles.paymentSection}>
            {clientSecret && (
              <Elements
                key={clientSecret}
                options={options}
                stripe={stripePromise}
              >
                <div className={styles.checkoutForm}>
                  <CheckoutForm />
                </div>
                <section></section>
              </Elements>
            )}
          </section>
        </div>
        <section className={styles.cartSection}>
          <h2>Your Cart</h2>
          {items.map((item) => {
            return <SmallProductCard key={item.id} data={item} />;
          })}
          <div className={styles.summary}>
            <span className={styles.total}>Total</span>
            <span className={styles.price}>${totalPrice}</span>
          </div>
        </section>
      </div>
    </Container>
  );
}
