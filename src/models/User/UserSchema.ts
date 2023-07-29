import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  driverLicense: z.string().regex(/^\d{11}$/, 'Invalid driver license number. The format should be "99999999999"'),
  email: z.string().email('Invalid email address'),
  name: z.string(),
  isAdmin: z.boolean().default(false),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export default UserSchema;