import { z } from 'zod';

export const userSchema = z.object({
  name: z.string(),
  age: z.number().positive('Age cannot be a negative number'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type User = z.infer<typeof userSchema>;
