import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    author: z.string().default('JD Satapathy'),
    category: z.string(),
    tags: z.array(z.string()),
    readTime: z.string().default('5 min read'),
    featured: z.boolean().default(false),
    youtubeUrl: z.string().optional(),
    architectureDiagram: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
