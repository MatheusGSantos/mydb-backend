import { z } from 'zod';

const CarSchema = z.object({
  id: z.string().uuid(),
  available: z.boolean().default(true),
  brand: z.string(),
  carImage: z.string(),
  categoryId: z.string(),
  dailyRate: z.number(),
  description: z.string(),
  fineAmount: z.number(),
  licensePlate: z.string().regex(/^[A-Z]{3}\d[A-Z]\d{2}$/, 'Invalid license plate. The format should be "AAA9A99"'),
  name: z.string(),
});

export default CarSchema;