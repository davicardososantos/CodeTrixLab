import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { IDS_NIVEIS, IDS_PILARES } from './consts';

// O cabeçalho de cada post. O modelo comentado está em docs/modelo-de-post.md.
const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
	schema: z.object({
		titulo: z.string(),
		descricao: z.string(),
		publicado: z.coerce.date(),
		atualizado: z.coerce.date().optional(),
		// Em IA tudo muda rápido: é a data em que as informações do post foram conferidas
		validoEm: z.coerce.date(),
		pilar: z.enum(IDS_PILARES),
		tags: z.array(z.string()).default([]),
		nivel: z.enum(IDS_NIVEIS),
		rascunho: z.boolean().default(false),
	}),
});

export const collections = { posts };
