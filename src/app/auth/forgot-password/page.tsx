'use client';

import Image from 'next/image';
import styles from './forgot-password.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import Container from '@/src/components/Container/Container';
import { useState } from 'react';
import { confirmResetPassword, resetPassword } from 'aws-amplify/auth';
import { emailSchema, resetPasswordSchema } from '@/src/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomButton from '@/src/components/CustomButton/CustomButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormInputs = {
  email: string;
  confirmCode?: string;
  password?: string;
  rePassword?: string;
};

type Steps = 'email' | 'password' | 'confirm';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Steps>('email');
  const [email, setEmail] = useState<string | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading, isDirty, isValid },
  } = useForm<FormInputs>({
    resolver: zodResolver(step === 'email' ? emailSchema : resetPasswordSchema),
  });

  const messageHandler = (message: string) => {
    toast(message);
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      if (step === 'email') {
        const output = await resetPassword({ username: data.email });
        const { nextStep } = output;

        if (nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
          const codeDeliveryDetails = nextStep.codeDeliveryDetails;
          setStep('password');
          messageHandler(
            `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
          );
          setEmail(data.email);
        }
      }

      if (step === 'password' && data.confirmCode && data.password) {
        await confirmResetPassword({
          username: email ? email : '',
          confirmationCode: data.confirmCode,
          newPassword: data.password,
        });
        setStep('confirm');
      }
    } catch (error: any) {
      messageHandler(`There is an error: ${error.message}`);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" theme="colored" />
      <main className={styles.container}>
        <Container color="white" className={styles.section}>
          <div className={styles.formContainer}>
            <h2>Password Reset</h2>
            {step === 'email' && (
              <div>
                <p className={styles.reset}>
                  An Email will be sent to you for reset your password
                </p>
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
                  </div>
                  <CustomButton
                    type="submit"
                    color="primary"
                    text="Send"
                    isLoading={isSubmitting || isLoading}
                  />
                </form>
              </div>
            )}
            {step === 'password' && (
              <div>
                <p className={styles.reset}>
                  Please enter the code sent to your email and your new password
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles.inputGroup}>
                    <div className={styles.input}>
                      <input
                        type="text"
                        {...register('confirmCode')}
                        placeholder="Code"
                      />
                      {errors.confirmCode && (
                        <p className={styles.error}>
                          {errors.confirmCode.message}
                        </p>
                      )}
                    </div>
                    <div className={styles.input}>
                      <input
                        type="password"
                        {...register('password')}
                        placeholder="New Password"
                      />
                      {errors.password && (
                        <p className={styles.error}>
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div className={styles.input}>
                      <input
                        type="password"
                        {...register('rePassword')}
                        placeholder="Enter New Password Again"
                      />
                      {errors.rePassword && (
                        <p className={styles.error}>
                          {errors.rePassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <CustomButton
                    type="submit"
                    color="primary"
                    text="Send"
                    isLoading={isSubmitting || isLoading}
                  />
                </form>
              </div>
            )}
            {step === 'confirm' && (
              <div>
                <p className={styles.reset}>Your password has been changed.</p>
              </div>
            )}

            <Image
              className={styles.coffeeBeansThree}
              src="/images/coffee-beans-3.webp"
              width={300}
              height={300}
              alt="3 coffee beans"
            />
          </div>
        </Container>
      </main>
    </>
  );
}
