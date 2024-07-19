import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().trim().min(3, { message: 'Name is required' }),
    surname: z.string().trim().min(3, { message: 'Surname is required' }),
    email: z.string().trim().email('Invalid email address'),
    password: z
      .string()
      .trim()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    rePassword: z
      .string()
      .trim()
      .min(6, { message: 'Re-enter password is required' }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: 'Password do not match',
    path: ['rePassword'],
  });

export const signInSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export const verificationSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  code: z.string().trim().min(1, { message: 'Code is required' }),
});

export const reSendCodeSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
});
