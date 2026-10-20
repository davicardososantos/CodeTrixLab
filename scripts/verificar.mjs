// Verificação que roda antes de cada commit e em todo build (npm run build).
// O repositório é público: o que passar daqui fica visível para qualquer pessoa, inclusive no histórico.
//
// Barra:
//   1. arquivo de segredo (.env, chave) e texto com cara de segredo (chave de API, token, senha);
//   2. post com `rascunho: true` (o rascunho fica fora do repositório);
//   3. link de Obsidian `[[ ]]` em post (o Astro não entende);
//   4. as palavras da lista local `.bloqueio.txt` (fora do Git) ou da variável CODETRIXLAB_BLOQUEIO.
//
// Exemplo com chave falsa em post: use "EXEMPLO" ou "xxxx" no valor e a verificação deixa passar.

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, extname, join, relative, sep } from 'node:path';

const RAIZ = process.cwd();
const EM_CI = Boolean(process.env.CI);
const PASTAS_IGNORADAS = new Set(['node_modules', 'dist', '.git', '.astro', '.wrangler']);
const EXTENSOES_BINARIAS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.ico', '.woff', '.woff2', '.pdf']);

const ARQUIVOS_DE_SEGREDO = [/^\.env(\..+)?$/, /\.pem$/, /\.key$/, /^id_(rsa|ed25519|ecdsa)(\.pub)?$/];

const SEGREDOS = [
	['chave privada', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
	['chave da Anthropic', /\bsk-ant-[A-Za-z0-9_-]{20,}/],
	['chave da OpenAI', /\bsk-(?!ant-)(?:proj-)?[A-Za-z0-9_-]{20,}/],
	['token do GitHub', /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})/],
	['chave da AWS', /\bAKIA[0-9A-Z]{16}\b/],
	['chave do Google', /\bAIza[0-9A-Za-z_-]{35}/],
	['token do Slack', /\bxox[abprs]-[A-Za-z0-9-]{10,}/],
	['JWT (por exemplo, chave do Supabase)', /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/],
	[
		'senha ou token escrito no texto',
		/\b(?:password|passwd|senha|secret|token|api[_-]?key)\b["']?\s*[:=]\s*["'][^"'\s]{8,}["']/i,
	],
];

const ehExemplo = (trecho) => /exemplo|xxxx/i.test(trecho);

/** Os arquivos que iriam para o GitHub: rastreados + novos que o .gitignore não esconde. */
function listarArquivos() {
	try {
		const saida = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], {
			cwd: RAIZ,
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'ignore'],
		});
		return saida.split('\0').filter((arquivo) => arquivo && existsSync(join(RAIZ, arquivo)));
	} catch {
		// Sem git (ou fora de um repositório): percorre as pastas
		const arquivos = [];
		const percorrer = (pasta) => {
			for (const nome of readdirSync(pasta)) {
				if (PASTAS_IGNORADAS.has(nome) || nome === '.bloqueio.txt') continue;
				const caminho = join(pasta, nome);
				if (statSync(caminho).isDirectory()) percorrer(caminho);
				else arquivos.push(relative(RAIZ, caminho).split(sep).join('/'));
			}
		};
		percorrer(RAIZ);
		return arquivos;
	}
}

function carregarBloqueio() {
	const linhas = [];
	const arquivo = join(RAIZ, '.bloqueio.txt');
	if (existsSync(arquivo)) linhas.push(...readFileSync(arquivo, 'utf8').split(/\r?\n/));
	if (process.env.CODETRIXLAB_BLOQUEIO) linhas.push(...process.env.CODETRIXLAB_BLOQUEIO.split(/\r?\n/));
	return linhas
		.map((linha) => linha.trim())
		.filter((linha) => linha && !linha.startsWith('#'))
		.map((termo) => ({
			termo,
			regex: new RegExp(`(?<![\\p{L}\\p{N}])${termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}\\p{N}])`, 'iu'),
		}));
}

const problemas = [];
const avisar = (arquivo, linha, motivo) => problemas.push(`${arquivo}${linha ? `:${linha}` : ''}  ${motivo}`);

const bloqueio = carregarBloqueio();
const arquivos = listarArquivos();

for (const arquivo of arquivos) {
	const nome = basename(arquivo);
	if (ARQUIVOS_DE_SEGREDO.some((padrao) => padrao.test(nome))) {
		avisar(arquivo, 0, 'arquivo de segredo não pode entrar no repositório');
		continue;
	}
	if (EXTENSOES_BINARIAS.has(extname(nome).toLowerCase())) continue;

	const texto = readFileSync(join(RAIZ, arquivo), 'utf8');
	const ehPost = arquivo.startsWith('src/content/posts/') && arquivo.endsWith('.md');
	let dentroDeCodigo = false;

	texto.split(/\r?\n/).forEach((linha, indice) => {
		const numero = indice + 1;

		for (const [descricao, padrao] of SEGREDOS) {
			const achado = linha.match(padrao);
			if (achado && !ehExemplo(achado[0])) avisar(arquivo, numero, `parece ${descricao}`);
		}

		for (const { termo, regex } of bloqueio) {
			// No CI o log é público: mostra só onde está, não a palavra
			if (regex.test(linha)) avisar(arquivo, numero, EM_CI ? 'palavra bloqueada' : `palavra bloqueada: "${termo}"`);
		}

		if (ehPost) {
			if (/^\s*(```|~~~)/.test(linha)) dentroDeCodigo = !dentroDeCodigo;
			if (!dentroDeCodigo && /!?\[\[[^\]\n]+\]\]/.test(linha)) {
				avisar(arquivo, numero, 'link de Obsidian [[ ]]: troque por [texto](link)');
			}
		}
	});

	if (ehPost && /^rascunho:\s*true\s*$/m.test(texto.split(/^---\s*$/m)[1] ?? '')) {
		avisar(arquivo, 0, 'post marcado como rascunho: o rascunho fica fora do repositório');
	}
}

if (problemas.length > 0) {
	console.error(`\n✖ Verificação barrou ${problemas.length} problema(s):\n`);
	for (const problema of problemas) console.error(`  ${problema}`);
	console.error('\nNada foi publicado. Corrija e rode de novo (npm run verificar).\n');
	process.exit(1);
}

const origemBloqueio = bloqueio.length > 0 ? `${bloqueio.length} palavra(s) bloqueada(s)` : 'sem lista de palavras bloqueadas';
console.log(`✔ Verificação ok: ${arquivos.length} arquivo(s), ${origemBloqueio}.`);
