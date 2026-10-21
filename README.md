# CodeTrix Lab

Blog do [Davi Cardoso](https://www.linkedin.com/in/davi-cardoso-gomes) sobre IA e automação na prática, em
**[blog.codetrix.com.br](https://blog.codetrix.com.br)**.

Compartilho o que sei e as novidades que estou estudando, explicado de um jeito simples. Se servir para você também,
ótimo.

## Como funciona

- Site estático feito com [Astro](https://astro.build), publicado na Cloudflare (Workers com arquivos estáticos).
- Cada post é um arquivo Markdown em `src/content/posts/`. O modelo está em [docs/modelo-de-post.md](docs/modelo-de-post.md).
- Publicar é dar `git push` na `main`: a Cloudflare roda `npm run build` e coloca no ar.
- O rascunho não passa por aqui. Só entra no repositório o post pronto.

## Rodar no seu computador

Precisa do Node 22.12 ou mais novo.

```bash
npm install
npm run dev      # abre em http://localhost:4321
npm run build    # verifica e gera o site em dist/
```

## Verificação antes de publicar

`npm run verificar` roda sozinho no `build`. Ele:

- procura segredo: arquivo `.env`, chave de API, token, senha;
- barra post marcado como rascunho e link de Obsidian (`[[ ]]`);
- se existir o arquivo local `.bloqueio.txt` (que nunca vai para o Git), barra as palavras dessa lista.

Para rodar a verificação antes de cada commit, uma vez só:

```bash
git config core.hooksPath .githooks
```

No GitHub, o workflow **Verificar** repete o build e roda o [gitleaks](https://github.com/gitleaks/gitleaks) no
histórico inteiro.
