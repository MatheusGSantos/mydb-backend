import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  driverLicense: z.string(),
  email: z.string().email('Invalid email address'),
  name: z.string(),
  isAdmin: z.boolean().default(false),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type User = z.infer<typeof userSchema>;

const defaultValuesToOmitOnValidate: Record<string, boolean> = {id: true, isAdmin: true};

export class UserUtilities {
  public static validate(user: Partial<User>, attrsToOmit: (keyof User)[] = []) {
    return userSchema.omit(
      {
        ...attrsToOmit.reduce(
          (acc, current) => {
            acc[current] = true;
            return acc;
          },
          {} as Record<keyof User, any>
         ),
        ...defaultValuesToOmitOnValidate
      }
    )
    .parse(user);
  }

  public static createUserWithoutPassword(user: User) {
    const { password:_ , ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}