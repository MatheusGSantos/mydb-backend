import { z } from 'zod';

const RentalSchema = z.object({
  id: z.string().uuid(),
  carId: z.string().uuid(),
  endDate: z.string().datetime(),
  userId: z.string().uuid(),
  expectedReturnDate: z.string().datetime(),
  startDate: z.string().datetime(),
  total: z.number(),
});

export default RentalSchema;