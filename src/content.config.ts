import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    isIndex: z.boolean().optional(),   // ← add this
    parent: z.string().optional(),     // ← add this
  }),
});

export const collections = { blog };
