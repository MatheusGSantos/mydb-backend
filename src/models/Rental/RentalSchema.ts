import { z } from 'zod';

const RentalSchema = z.object({
  id: z.string().uuid(),
  carId: z.string().uuid(),
  endDate: z.string().datetime({offset: true}).nullable(),
  userId: z.string().uuid(),
  expectedReturnDate: z.string().datetime({offset: true}),
  startDate: z.string().datetime({offset: true}),
  total: z.number().nullable(),
});

export default RentalSchema;