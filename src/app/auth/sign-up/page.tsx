'use client';

import Link from 'next/link';
import styles from './sign-up.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import Container from '@/src/components/Container/Container';
import { signUpSchema } from '@/src/schemas/auth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import CustomButton from '@/src/components/CustomButton/CustomButton';
import { useRouter } from 'next/navigation';
import { handleSignUp } from '@/src/lib/cognitoActions';

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpResponse {
  error?: string;
  message?: string;
  exists: boolean;
  success?: boolean;
}

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const response = (await handleSignUp(data)) as SignUpResponse;

      if (response.exists) {
        setError('User already exists');
        reset();
      }

      if (response.success) {
        router.push('/auth/confirm-signup');
      }
    } catch (error) {
      reset();
      setError('Something went wrong, try again later.');
    }
  };

  return (
    <main className={styles.container}>
      <Container color="white">
        <section className={styles.section}>
          <div className={styles.formContainer}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputGroup}>
                <div className={styles.input}>
                  <input type="name" {...register('name')} placeholder="Name" />
                  {errors.name && (
                    <p className={styles.error}>{errors.name.message}</p>
                  )}
                </div>
                <div className={styles.input}>
                  <input
                    type="surname"
                    {...register('surname')}
                    placeholder="Surname"
                  />
                  {errors.surname && (
                    <p className={styles.error}>{errors.surname.message}</p>
                  )}
                </div>
              </div>
              <div className={styles.inputGroup}>
                <div className={styles.input}>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className={styles.error}>{errors.email.message}</p>
                  )}
                </div>
                <div className={styles.input}>
                  <input
                    type="password"
                    {...register('password')}
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className={styles.error}>{errors.password.message}</p>
                  )}
                </div>
                <div className={styles.input}>
                  <input
                    type="password"
                    {...register('rePassword')}
                    placeholder="Re-Enter Password"
                  />
                  {errors.rePassword && (
                    <p className={styles.error}>{errors.rePassword.message}</p>
                  )}
                </div>
              </div>
              <CustomButton
                text="Sign Up"
                isLoading={isLoading || isSubmitting}
              />
              <div className={styles.register}>
                <span>Already registered?</span>
                <Link href="/auth/sign-in">Sign In</Link>
              </div>
            </form>
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
