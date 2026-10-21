// Gera a imagem que aparece no cartão do link (LinkedIn, WhatsApp...): 1200 x 630, feita no build.
// O satori desenha o layout em SVG (com o texto já virado traço) e o sharp transforma em PNG.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { IMAGEM_SOCIAL } from '../consts';

const { largura: LARGURA_IMAGEM, altura: ALTURA_IMAGEM } = IMAGEM_SOCIAL;

const COR = {
	fundo: '#1a1a1a',
	texto: '#ffffff',
	suave: '#a9a3b2',
	roxo: '#d580ff',
	verde: '#39ff14',
};

// O satori não lê woff2, por isso as fontes aqui são as .woff do mesmo pacote
const lerFonte = (pacote: string, arquivo: string) =>
	readFile(join(process.cwd(), 'node_modules', '@fontsource', pacote, 'files', arquivo));

let fontes: ReturnType<typeof carregarFontes> | undefined;
async function carregarFontes() {
	const [r400, r700, r900, m500] = await Promise.all([
		lerFonte('roboto', 'roboto-latin-400-normal.woff'),
		lerFonte('roboto', 'roboto-latin-700-normal.woff'),
		lerFonte('roboto', 'roboto-latin-900-normal.woff'),
		lerFonte('roboto-mono', 'roboto-mono-latin-500-normal.woff'),
	]);
	return [
		{ name: 'Roboto', data: r400, weight: 400 as const, style: 'normal' as const },
		{ name: 'Roboto', data: r700, weight: 700 as const, style: 'normal' as const },
		{ name: 'Roboto', data: r900, weight: 900 as const, style: 'normal' as const },
		{ name: 'Roboto Mono', data: m500, weight: 500 as const, style: 'normal' as const },
	];
}

type No = { type: string; props: { style?: Record<string, unknown>; children?: unknown } };
const el = (type: string, style: Record<string, unknown>, children?: unknown): No => ({
	type,
	props: { style, children },
});

/** Título curto fica grande; título longo diminui para caber em até 4 linhas. */
function tamanhoDoTitulo(titulo: string): number {
	if (titulo.length <= 40) return 80;
	if (titulo.length <= 70) return 66;
	return 56;
}

export async function gerarImagemSocial({ titulo, rotulo }: { titulo: string; rotulo: string }): Promise<Uint8Array> {
	const layout = el(
		'div',
		{
			width: LARGURA_IMAGEM,
			height: ALTURA_IMAGEM,
			display: 'flex',
			flexDirection: 'column',
			background: COR.fundo,
			fontFamily: 'Roboto',
			color: COR.texto,
		},
		[
			el(
				'div',
				{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '60px 72px 44px',
				},
				[
					el('div', { display: 'flex', alignItems: 'center', gap: 18 }, [
						el(
							'div',
							{
								display: 'flex',
								background: '#000000',
								color: COR.verde,
								fontFamily: 'Roboto Mono',
								fontWeight: 500,
								fontSize: 28,
								padding: '6px 14px',
								borderRadius: 10,
							},
							'</>',
						),
						el('div', { display: 'flex', fontSize: 36 }, [
							el('span', { color: COR.texto }, 'CodeTrix '),
							el('span', { color: COR.roxo, fontWeight: 700 }, 'Lab'),
						]),
					]),
					el('div', { display: 'flex', flexDirection: 'column', gap: 18 }, [
						el('div', { fontFamily: 'Roboto Mono', fontWeight: 500, fontSize: 28, color: COR.roxo }, `// ${rotulo}`),
						el(
							'div',
							{
								fontSize: tamanhoDoTitulo(titulo),
								fontWeight: 900,
								lineHeight: 1.08,
								letterSpacing: -1,
								textWrap: 'balance',
								color: COR.texto,
							},
							titulo,
						),
					]),
					el('div', { display: 'flex', justifyContent: 'space-between', fontSize: 26, color: COR.suave }, [
						el('span', {}, 'Davi Cardoso'),
						el('span', { fontFamily: 'Roboto Mono', fontWeight: 500, color: COR.verde }, 'blog.codetrix.com.br'),
					]),
				],
			),
			el('div', { height: 12, backgroundImage: `linear-gradient(90deg, ${COR.roxo}, ${COR.verde})` }),
		],
	);

	fontes ??= carregarFontes();
	// O satori aceita esse formato de objeto no lugar de JSX
	const svg = await satori(layout as never, { width: LARGURA_IMAGEM, height: ALTURA_IMAGEM, fonts: await fontes });
	return new Uint8Array(await sharp(Buffer.from(svg)).png().toBuffer());
}
