import { z } from 'zod';

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type User = z.infer<typeof userSchema>;

export type ommitableAttrs = 'password';

export class UserUtilities {
  // validateUserFields should check if the user object has all the required fields. If validateAll is false, it should only check if the user object has at least one of the required fields and parse against the schema.
  static validateUserFields(user: User, attrsToOmit: ommitableAttrs[] = []) {
    if (attrsToOmit.length > 0) {
      userSchema
        .partial()
        .omit(
          attrsToOmit.reduce((acc, current) => {
              acc[current] = true;
              return acc;
            },
            {} as Record<ommitableAttrs, any>
          )
        )
        .parse(user);

      return;
    }
    
    userSchema.partial().parse(user);
  }
}
