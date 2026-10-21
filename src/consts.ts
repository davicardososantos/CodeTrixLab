export const SITE_TITULO = 'CodeTrix Lab';
export const SITE_DESCRICAO =
	'Caderno de estudos de IA e automação do Davi Cardoso, escrito do jeito que ele mesmo entenderia daqui a seis meses.';
export const AUTOR = 'Davi Cardoso';

export const LINKS = {
	codetrix: 'https://codetrix.com.br',
	github: 'https://github.com/davicardososantos',
	linkedin: 'https://www.linkedin.com/in/davi-cardoso-gomes',
	repositorio: 'https://github.com/davicardososantos/CodeTrixLab',
};

/** A imagem do cartão do link (LinkedIn, WhatsApp...), gerada em lib/imagem-social.ts */
export const IMAGEM_SOCIAL = { largura: 1200, altura: 630 };

export const IDS_PILARES = ['metodo', 'agentes', 'automacao', 'nuvem', 'seguranca', 'certificacao'] as const;
export type IdPilar = (typeof IDS_PILARES)[number];

// Os ícones de cada pilar ficam em components/IconePilar.astro
export const PILARES: Record<IdPilar, { nome: string; descricao: string }> = {
	metodo: {
		nome: 'Método',
		descricao: 'SDD, PRD, especificação e revisão de código com IA: o documento antes do código.',
	},
	agentes: {
		nome: 'Agentes e ferramentas',
		descricao: 'Claude Code, Codex, GitHub Copilot, MCP, skills, subagentes e computer use.',
	},
	automacao: {
		nome: 'Automação na prática',
		descricao: 'n8n, scripts, WhatsApp e vídeo programado.',
	},
	nuvem: {
		nome: 'Microsoft e nuvem',
		descricao: '.NET 10, Blazor, Azure, banco na nuvem e busca vetorial.',
	},
	seguranca: {
		nome: 'Segurança',
		descricao: 'Segredos, checklists e prompt injection: IA sem deixar a porta aberta.',
	},
	certificacao: {
		nome: 'Diário de certificação',
		descricao: 'O estudo para as provas, começando pela GH-300 (GitHub Copilot).',
	},
};

export const IDS_NIVEIS = ['sem-jargao', 'dev'] as const;
export type IdNivel = (typeof IDS_NIVEIS)[number];

export const NIVEIS: Record<IdNivel, string> = {
	'sem-jargao': 'Sem jargão',
	dev: 'Para devs',
};
