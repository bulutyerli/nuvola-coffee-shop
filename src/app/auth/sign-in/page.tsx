'use client';

import Link from 'next/link';
import styles from './sign-in.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import Container from '@/src/components/Container/Container';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomButton from '@/src/components/CustomButton/CustomButton';
import { z } from 'zod';
import { signInSchema } from '@/src/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleSignIn } from '@/src/lib/cognitoActions';

type SignInFormData = z.infer<typeof signInSchema>;

type Response = {
  verify?: boolean;
  success?: boolean;
};

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<SignInFormData>({ resolver: zodResolver(signInSchema) });

  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      const response = (await handleSignIn(data)) as Response;

      if (response.verify) {
        router.push('/auth/confirm-signup');
      }

      if (response.success) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      setError('Something went wrong, please try again');
    }
  };

  return (
    <main className={styles.container}>
      <Container color="white">
        <section className={styles.section}>
          <div className={styles.formContainer}>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    placeholder="Password"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className={styles.error}>{errors.password.message}</p>
                  )}
                </div>
              </div>
              <CustomButton
                isLoading={isLoading || isSubmitting}
                text="Sign In"
              />
              <Link
                href="/auth/forgot-password"
                className={styles.forgotPassword}
              >
                Forgot Password?
              </Link>
              <div className={styles.register}>
                <span>Don&apos;t you have an account yet?</span>
                <Link href="/auth/sign-up">Sign Up!</Link>
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
