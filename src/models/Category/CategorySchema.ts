import { z } from 'zod';

const CategorySchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  icon: z.string(),
  name: z.string(),
  displayName: z.string(),
});

export default CategorySchema;
