import { z } from 'zod';
import CarSchema from './CarSchema';
import { UtilityClass } from 'models/UtilityBaseClass';

type Car = z.infer<typeof CarSchema>;
const CarUtilities = new UtilityClass(CarSchema);

export {
  Car,
  CarSchema,
  CarUtilities,
}