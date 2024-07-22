'use client';

import { useEffect, useState } from 'react';
import styles from './checkoutForm.module.scss';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/checkout/complete',
      },
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'An error occurred.');
      } else {
        setMessage('An unexpected error occurred.');
      }
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form
      id="payment-form"
      className={styles.paymentForm}
      onSubmit={handleSubmit}
    >
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        className={styles.submitButton}
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? (
            <div className={styles.spinner} id="spinner"></div>
          ) : (
            'Pay now'
          )}
        </span>
      </button>
      {message && (
        <div id="payment-message" className={styles.paymentMessage}>
          {message}
        </div>
      )}
    </form>
  );
}
