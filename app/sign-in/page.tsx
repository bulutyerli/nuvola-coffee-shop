'use client';

import Link from 'next/link';
import Container from '../components/Container/Container';
import styles from './sign-in.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';

type FormInputs = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <main className={styles.container}>
      <Container>
        <section className={styles.section}>
          <div className={styles.formContainer}>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputGroup}>
                <div className={styles.input}>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address',
                      },
                    })}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className={styles.error}>{errors.email.message}</p>
                  )}
                </div>
                <div className={styles.input}>
                  <input
                    type="password"
                    {...register('password', {
                      required: 'Password is required',
                    })}
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className={styles.error}>{errors.password.message}</p>
                  )}
                </div>
              </div>
              <button type="submit">Sign In</button>
              <Link href="/forgot-password" className={styles.forgotPassword}>
                Forgot Password?
              </Link>
              <div className={styles.register}>
                <span>Don&apos;t you have an account yet?</span>
                <Link href="/sign-up">Sign Up!</Link>
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
        </section>
      </Container>
    </main>
  );
}
