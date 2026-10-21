// Imagem do cartão de cada post: /og/assunto.png
import type { APIRoute, GetStaticPaths } from 'astro';
import { PILARES } from '../../consts';
import { gerarImagemSocial } from '../../lib/imagem-social';
import { type Post, postsPublicados, slugDoPost } from '../../lib/posts';

export const getStaticPaths = (async () => {
	const posts = await postsPublicados();
	return posts.map((post) => ({ params: { slug: slugDoPost(post) }, props: { post } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
	const { titulo, pilar } = (props as { post: Post }).post.data;
	return new Response(await gerarImagemSocial({ titulo, rotulo: PILARES[pilar].nome.toLowerCase() }), {
		headers: { 'Content-Type': 'image/png' },
	});
};
