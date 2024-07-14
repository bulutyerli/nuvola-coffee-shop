'use client';

import Link from 'next/link';
import Container from '../components/Container/Container';
import styles from './sign-up.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';

type FormInputs = {
  name: string;
  surname: string;
  email: string;
  password: string;
  rePassword: string;
};

export default function SignUpPage() {
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
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputGroup}>
                <div className={styles.input}>
                  <input
                    type="name"
                    {...register('name', {
                      required: 'Name is required',
                    })}
                    placeholder="Name"
                  />
                  {errors.name && (
                    <p className={styles.error}>{errors.name.message}</p>
                  )}
                </div>
                <div className={styles.input}>
                  <input
                    type="surname"
                    {...register('surname', {
                      required: 'Surname is required',
                    })}
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
                <div className={styles.input}>
                  <input
                    type="password"
                    {...register('rePassword', {
                      required: 'Password is required',
                    })}
                    placeholder="Re-Enter Password"
                  />
                  {errors.rePassword && (
                    <p className={styles.error}>{errors.rePassword.message}</p>
                  )}
                </div>
              </div>
              <button type="submit">Sign Up</button>
              <div className={styles.register}>
                <span>Already registered?</span>
                <Link href="/sign-in">Sign In</Link>
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
