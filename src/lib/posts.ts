import { type CollectionEntry, getCollection } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** Posts em ordem do mais novo para o mais antigo. Rascunho só aparece no `npm run dev`. */
export async function postsPublicados(): Promise<Post[]> {
	const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.rascunho);
	return posts.sort((a, b) => b.data.publicado.valueOf() - a.data.publicado.valueOf());
}

/** O arquivo se chama AAAA-MM-DD-assunto.md, mas a data sai da URL. */
export function slugDoPost(post: Post): string {
	return post.id.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

export function urlDoPost(post: Post): string {
	return `/posts/${slugDoPost(post)}/`;
}

export function slugDaTag(tag: string): string {
	return tag
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

/** As datas do cabeçalho viram meia-noite em UTC; formatar em UTC evita mostrar o dia anterior no Brasil. */
export function formatarData(data: Date): string {
	return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
