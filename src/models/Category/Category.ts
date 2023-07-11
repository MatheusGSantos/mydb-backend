import { z } from 'zod';

export const categorySchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  icon: z.string(),
  name: z.string(),
});

const categorySchemaKeys = Object.keys(categorySchema.shape);

export type Category = z.infer<typeof categorySchema>;

export class CategoryUtilities {
  static getSafeObject(obj: Record<string, any>) {
    const safeObject: Record<string, any> = {};

    for (const key of categorySchemaKeys) {
      if (obj.hasOwnProperty(key)) {
        safeObject[key] = obj[key];
      }
    }

    return safeObject;
  }

  static validateCar(category: Record<string, any>, pick: typeof categorySchemaKeys = [], omit: typeof categorySchemaKeys = []) {
    if (pick.length > 0 && omit.length > 0) {
      throw new Error('Cannot use both pick and omit');
    }

    const safeObject = CategoryUtilities.getSafeObject(category);

    if (pick.length > 0) {
      const pickObject: Record<string, boolean> = {};

      for (const key of pick) {
        pickObject[key] = true;
      }

      return categorySchema.pick(pickObject).parse(safeObject);
    }

    if (omit.length > 0) {
      const omitObject: Record<string, boolean> = {};

      for (const key of omit) {
        omitObject[key] = true;
      }

      return categorySchema.omit(omitObject).parse(safeObject);
    }

    return categorySchema.parse(safeObject);
  }
}