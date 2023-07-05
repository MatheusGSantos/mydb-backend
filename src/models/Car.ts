import { z } from 'zod';

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

export type Car = z.infer<typeof carSchema>;