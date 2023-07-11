import { z } from 'zod';

const categorySchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  icon: z.string(),
  name: z.string(),
});

export default categorySchema;