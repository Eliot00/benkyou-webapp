import { defineCollection, z } from 'astro:content';

import { glob } from 'astro/loaders';

const tips = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/tips' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { tips };
