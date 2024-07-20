import { z } from 'zod';

export const addressSchema = z.object({
  address_name: z
    .string()
    .trim()
    .min(1, { message: 'Address title is required' }),
  name: z.string().trim().min(1, { message: 'Name is required' }),
  surname: z.string().trim().min(2, { message: 'Surname is required' }),
  address_line1: z.string().trim().min(1, { message: 'Address is required' }),
  address_line2: z.string().trim().optional().nullable(),
  city: z.string().trim().min(1, { message: 'City is required' }),
  state: z.string().trim().min(1, { message: 'State is required' }),
  postal_code: z.string().trim().min(1, { message: 'Postal code is required' }),
  country: z.string().trim().min(1, { message: 'Country is required' }),
});
