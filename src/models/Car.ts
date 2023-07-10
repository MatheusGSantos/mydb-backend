import { z } from 'zod';

// Define the schema for the Car object using the Zod library.
export const carSchema = z.object({
  id: z.string().uuid(),
  available: z.boolean().default(true),
  brand: z.string(),
  carImage: z.string(),
  categoryId: z.string(),
  dailyRate: z.number(),
  description: z.string(),
  fineAmount: z.number(),
  licensePlate: z.string(),
  name: z.string(),
});

// Get the keys of the carSchema object.
const carSchemaKeys = Object.keys(carSchema.shape);

// Define the Car type using the inferred type from the carSchema object.
export type Car = z.infer<typeof carSchema>;

// Define a utility class for the Car object.
export class CarUtilities {
  // Get a safe object with only the keys defined in the carSchema object.
  static getSafeObject(obj: Record<string, any>) {
    const safeObject: Record<string, any> = {};

    for (const key of carSchemaKeys) {
      if (obj.hasOwnProperty(key)) {
        safeObject[key] = obj[key];
      }
    }

    return safeObject;
  }

  // Validate a Car object using the carSchema object and either a pick or omit array of keys.
  static validateCar(car: Record<string, any>, pick: typeof carSchemaKeys = [], omit: typeof carSchemaKeys = []) {
    if (pick.length > 0 && omit.length > 0) {
      throw new Error('Cannot use both pick and omit');
    }

    const safeObject = CarUtilities.getSafeObject(car);

    if (pick.length > 0) {
      const pickObject: Record<string, boolean> = {};

      for (const key of pick) {
        pickObject[key] = true;
      }

      return carSchema.pick(pickObject).parse(safeObject);
    }

    if (omit.length > 0) {
      const omitObject: Record<string, boolean> = {};

      for (const key of omit) {
        omitObject[key] = true;
      }

      return carSchema.omit(omitObject).parse(safeObject);
    }

    return carSchema.parse(safeObject);
  }
}
