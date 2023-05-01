import { z } from 'zod';

export const userSchema = z.object({
  name: z.string(),
  age: z.number().positive('Age cannot be a negative number'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type User = z.infer<typeof userSchema>;

export class UserUtilities {
  // validateUserFields should check if the user object has all the required fields. If validateAll is false, it should only check if the user object has at least one of the required fields and parse against the schema.
  static validateUserFields(user: User, validateAll = true) {
    if (validateAll) {
      userSchema.parse(user);
    } else {
      userSchema.partial().omit({ password: true }).parse(user);
    }
  }
}
