import { z } from 'zod';

export const categorySchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  icon: z.string(),
  name: z.string(),
});

export type Category = z.infer<typeof categorySchema>;