'use client';

import { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import styles from './complete.module.scss';

export default function CompletePage() {
  const [message, setMessage] = useState('');

  const stripe = useStripe();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        if (paymentIntent) {
          switch (paymentIntent.status) {
            case 'succeeded':
              setMessage('Payment succeeded!');

              break;
            case 'processing':
              console.log('processssss');
              setMessage('Your payment is processing.');
              break;
            case 'requires_payment_method':
              setMessage('Your payment was not successful, please try again.');
              break;
            default:
              setMessage('Something went wrong.');
              break;
          }
        } else {
          setMessage('Payment intent could not be retrieved.');
        }
      })
      .catch(() => {
        setMessage('An error occurred while retrieving the payment intent.');
      });
  }, [stripe]);

  return <main className={styles.container}>{message}</main>;
}
