import { z } from 'zod';
import CategorySchema from './CategorySchema';
import { UtilityClass } from 'models/UtilityBaseClass';

type Category = z.infer<typeof CategorySchema>;
const CategoryUtilities = new UtilityClass(CategorySchema);

export {
  Category,
  CategorySchema,
  CategoryUtilities,
}