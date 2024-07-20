'use client';

import styles from './confirm-signup.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import Container from '@/src/components/Container/Container';
import CustomButton from '@/src/components/CustomButton/CustomButton';
import { verificationSchema } from '@/src/schemas/auth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  handleConfirmSignUp,
  handleSendEmailVerificationCode,
} from '@/src/lib/cognitoActions';

type VerifyEmailType = z.infer<typeof verificationSchema>;

interface ResponseType {
  error?: string;
  message?: string;
  success?: boolean;
}

export default function ConfirmSignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading, isDirty, isValid },
    getValues,
  } = useForm<VerifyEmailType>({ resolver: zodResolver(verificationSchema) });

  const [error, setError] = useState('');

  const router = useRouter();

  const onSubmit: SubmitHandler<VerifyEmailType> = async (data) => {
    try {
      const response = (await handleConfirmSignUp(data)) as ResponseType;

      if (response.success) {
        router.push('/auth/sign-in');
      }
    } catch (error) {
      console.log(error);
      setError('Something went wrong try again or re-send code');
    }
  };

  const handleReSend = async () => {
    try {
      const email = getValues('email');
      if (!email) {
        setError('Email is required to resend verification code');
        return;
      }

      await handleSendEmailVerificationCode(
        { message: '', errorMessage: '' },
        { email }
      );
      setError('Verification code resent successfully');
    } catch (error) {
      console.log(error);
      setError('Something went wrong, please try again or re-send code');
    }
  };

  return (
    <main className={styles.container}>
      <Container color="white">
        <section className={styles.section}>
          <div className={styles.formContainer}>
            <h2>Enter Email Verification Code</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputGroup}>
                <div className={styles.input}>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="Email"
                  />
                  {errors.code && (
                    <p className={styles.error}>{errors.code.message}</p>
                  )}
                </div>
                <div className={styles.input}>
                  <input
                    type="text"
                    {...register('code')}
                    placeholder="Verification Code"
                  />
                  {errors.code && (
                    <p className={styles.error}>{errors.code.message}</p>
                  )}
                </div>
              </div>
              <CustomButton
                type="submit"
                color="primary"
                isLoading={isLoading || isSubmitting}
                text="Confirm"
              ></CustomButton>
            </form>
            <button onClick={handleReSend} className={styles.resend}>
              Re-Send Verification Code
            </button>

            <Image
              className={styles.coffeeBeansThree}
              src="/images/coffee-beans-3.webp"
              width={300}
              height={300}
              alt="3 coffee beans"
            />
          </div>
          {error.length > 1 && <span className={styles.error}>{error}</span>}
        </section>
      </Container>
    </main>
  );
}
