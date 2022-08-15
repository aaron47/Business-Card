import z from 'zod';

export const createProfileSchema = z.object({
  name: z.string(),
  slug: z.string(),
  bio: z.string(),
  phone: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
});

export type createProfileInput = z.infer<typeof createProfileSchema>;
