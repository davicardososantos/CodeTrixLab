// Imagem do cartão das páginas gerais (início, pilares, Sobre, Agora): /og.png
import type { APIRoute } from 'astro';
import { gerarImagemSocial } from '../lib/imagem-social';

export const GET: APIRoute = async () =>
	new Response(
		await gerarImagemSocial({ titulo: 'IA e automação na prática', rotulo: 'explicado de um jeito simples' }),
		{ headers: { 'Content-Type': 'image/png' } },
	);
