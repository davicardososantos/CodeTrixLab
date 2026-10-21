// Imagem do cartão das páginas gerais (início, pilares, Sobre, Agora): /og.png
import type { APIRoute } from 'astro';
import { gerarImagemSocial } from '../lib/imagem-social';

export const GET: APIRoute = async () =>
	new Response(
		await gerarImagemSocial({ titulo: 'Caderno de estudos de IA e automação', rotulo: 'escrito para eu entender' }),
		{ headers: { 'Content-Type': 'image/png' } },
	);
