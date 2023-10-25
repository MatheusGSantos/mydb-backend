import { z } from 'zod';
import RentalSchema from './RentalSchema';
import { UtilityClass } from 'models/UtilityBaseClass';

type Rental = z.infer<typeof RentalSchema>;
const RentalUtilities = new UtilityClass(RentalSchema);

export {
  Rental,
  RentalSchema,
  RentalUtilities,
}