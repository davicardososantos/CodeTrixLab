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

export const IDS_PILARES = ['metodo', 'agentes', 'automacao', 'nuvem', 'seguranca', 'certificacao'] as const;
export type IdPilar = (typeof IDS_PILARES)[number];

export const PILARES: Record<IdPilar, { nome: string; emoji: string; descricao: string }> = {
	metodo: {
		nome: 'Método',
		emoji: '🧭',
		descricao: 'SDD, PRD, especificação e revisão de código com IA: o documento antes do código.',
	},
	agentes: {
		nome: 'Agentes e ferramentas',
		emoji: '🤖',
		descricao: 'Claude Code, Codex, GitHub Copilot, MCP, skills, subagentes e computer use.',
	},
	automacao: {
		nome: 'Automação na prática',
		emoji: '🔁',
		descricao: 'n8n, scripts, WhatsApp e vídeo programado.',
	},
	nuvem: {
		nome: 'Microsoft e nuvem',
		emoji: '☁️',
		descricao: '.NET 10, Blazor, Azure, banco na nuvem e busca vetorial.',
	},
	seguranca: {
		nome: 'Segurança',
		emoji: '🔒',
		descricao: 'Segredos, checklists e prompt injection: IA sem deixar a porta aberta.',
	},
	certificacao: {
		nome: 'Diário de certificação',
		emoji: '🎓',
		descricao: 'O estudo para as provas, começando pela GH-300 (GitHub Copilot).',
	},
};

export const IDS_NIVEIS = ['sem-jargao', 'dev'] as const;
export type IdNivel = (typeof IDS_NIVEIS)[number];

export const NIVEIS: Record<IdNivel, string> = {
	'sem-jargao': 'Sem jargão',
	dev: 'Para devs',
};
