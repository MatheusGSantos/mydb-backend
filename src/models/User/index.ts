import { z } from 'zod';
import UserSchema from './UserSchema';
import { UtilityClass } from 'models/UtilityBaseClass';

type User = z.infer<typeof UserSchema>;
const UserUtilities = new UtilityClass(UserSchema);

export {
  User,
  UserSchema,
  UserUtilities,
}