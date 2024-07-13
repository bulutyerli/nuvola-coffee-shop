'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './contactForm.module.scss';

type FormInputs = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <div className={styles.input}>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              placeholder="Name"
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>
          <div className={styles.input}>
            <input
              type="text"
              {...register('surname', { required: 'Surname is required' })}
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
              type="tel"
              {...register('phone', { required: 'Phone number is required' })}
              placeholder="Phone"
            />
            {errors.phone && (
              <p className={styles.error}>{errors.phone.message}</p>
            )}
          </div>
        </div>
        <div className={styles.input}>
          <textarea
            {...register('message', { required: 'Message is required' })}
            placeholder="Message"
          ></textarea>
          {errors.message && (
            <p className={styles.error}>{errors.message.message}</p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
