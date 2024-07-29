'use client';

import { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import styles from './complete.module.scss';
import { useDispatch } from '@/src/redux/store';
import { clearCart } from '@/src/redux/slices/cartSlice';
import Container from '@/src/components/Container/Container';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { clearOrder } from '@/src/redux/slices/orderSlice';

export default function PaymentStatusPage() {
  const [message, setMessage] = useState({ message: '', success: false });
  const stripe = useStripe();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      router.push('/');
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent) {
        switch (paymentIntent.status) {
          case 'succeeded':
            dispatch(clearOrder());
            dispatch(clearCart());
            setMessage({
              message:
                'Thank you for your purchase! Your payment was successful',
              success: true,
            });
            break;
          case 'processing':
            setMessage({
              message: 'Your payment is currently being processed',
              success: false,
            });
            break;
          case 'requires_payment_method':
            setMessage({
              message: 'Unfortunately, your payment could not be completed',
              success: false,
            });
            router.push('/checkout');
            break;
          default:
            setMessage({
              message:
                'An unexpected error occurred. Please contact our support team for assistance.',
              success: false,
            });
            break;
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripe]);

  return (
    <Container color="white">
      <div className={styles.container}>
        <h1>{message.message}</h1>
        {message.success && (
          <div className={styles.orderLinkContainer}>
            <h2>You can check your order and shipping status from here:</h2>
            <Link href="/orders">Go to My Orders</Link>
          </div>
        )}
      </div>
    </Container>
  );
}
