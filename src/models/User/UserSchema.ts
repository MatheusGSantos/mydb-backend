import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  driverLicense: z.string(),
  email: z.string().email('Invalid email address'),
  name: z.string(),
  isAdmin: z.boolean().default(false),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export default UserSchema;