// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// As fontes do manual da marca CodeTrix: Roboto (títulos em Black) e Roboto Mono (o "texto tech").
// Os arquivos vêm do npm (@fontsource) e são servidos pelo próprio blog, sem chamar o Google.
const roboto = (peso, estilo = 'normal') => ({
	src: [`./node_modules/@fontsource/roboto/files/roboto-latin-${peso}-${estilo}.woff2`],
	weight: peso,
	style: estilo,
	display: 'swap',
});
const robotoMono = (peso) => ({
	src: [`./node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-${peso}-normal.woff2`],
	weight: peso,
	style: 'normal',
	display: 'swap',
});

export default defineConfig({
	site: 'https://blog.codetrix.com.br',
	integrations: [sitemap()],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Roboto',
			cssVariable: '--fonte-roboto',
			fallbacks: ['system-ui', 'sans-serif'],
			options: {
				variants: [roboto(400), roboto(400, 'italic'), roboto(700), roboto(700, 'italic'), roboto(900)],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Roboto Mono',
			cssVariable: '--fonte-roboto-mono',
			fallbacks: ['ui-monospace', 'monospace'],
			options: {
				variants: [robotoMono(400), robotoMono(500)],
			},
		},
	],
	markdown: {
		// O Mermaid fica de fora do realce de código: o navegador desenha o diagrama (ver layouts/Post.astro)
		syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
		shikiConfig: {
			themes: { light: 'github-light', dark: 'github-dark' },
		},
	},
});
