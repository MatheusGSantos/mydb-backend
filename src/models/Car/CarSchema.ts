import { z } from 'zod';

// Define the schema for the Car object using the Zod library.
const CarSchema = z.object({
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

export default CarSchema;