import rss from '@astrojs/rss';
import { SITE_DESCRICAO, SITE_TITULO } from '../consts';
import { postsPublicados, urlDoPost } from '../lib/posts';

export async function GET(context) {
	const posts = await postsPublicados();
	return rss({
		title: SITE_TITULO,
		description: SITE_DESCRICAO,
		site: context.site,
		customData: '<language>pt-BR</language>',
		items: posts.map((post) => ({
			title: post.data.titulo,
			description: post.data.descricao,
			pubDate: post.data.publicado,
			link: urlDoPost(post),
			categories: post.data.tags,
		})),
	});
}
