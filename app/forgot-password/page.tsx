'use client';

import Image from 'next/image';
import Container from '../components/Container/Container';
import styles from './forgot-password.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormInputs = {
  email: string;
};

export default function ForgotPasswordPage() {
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
            <h2>Password Reset</h2>
            <p className={styles.reset}>
              An Email will be sent to you for reset your password
            </p>
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
              </div>
              <button type="submit">Send</button>
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
