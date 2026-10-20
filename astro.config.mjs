// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://blog.codetrix.com.br',
	integrations: [sitemap()],
	markdown: {
		// O Mermaid fica de fora do realce de código: o navegador desenha o diagrama (ver layouts/Post.astro)
		syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
		shikiConfig: {
			themes: { light: 'github-light', dark: 'github-dark' },
		},
	},
});
