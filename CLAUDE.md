# CodeTrix Lab: regras para agentes

Blog estático com os estudos de IA e automação do Davi Cardoso, em `blog.codetrix.com.br`.
Astro 7 gera o site em `dist/`, e a Cloudflare (Workers com arquivos estáticos) publica.

**Este repositório é público.** Tudo o que entra aqui, inclusive o histórico, fica visível para qualquer pessoa.

## Nunca entra

- Nada do trabalho do autor para empresas ou clientes: nome de empresa ou cliente, sistema interno, código, tela, dado
  ou pessoa.
- Material copiado de cursos e treinamentos (slide, laboratório, trecho de gravação). Só o que foi aprendido, com
  palavras e exemplos próprios.
- Dado pessoal de outras pessoas e finanças pessoais.
- Senha, chave, token ou `.env`. Em exemplo, use um valor claramente falso, com "EXEMPLO" ou "xxxx".
- Promessa de dinheiro.
- Afirmação sem fonte sobre ferramenta de IA. Escreva "testei em DD/MM/AAAA" ou "segundo a fonte X".
- Rascunho. O rascunho fica fora daqui; só entra o post pronto.

## Como escrever um post

- O modelo está em `docs/modelo-de-post.md`. O esquema que vale é o de `src/content.config.ts`.
- Linguagem simples: todo termo técnico é explicado na primeira vez que aparece, de preferência com uma comparação do
  dia a dia.
- Link Markdown normal (`[texto](link)`), nunca `[[ ]]`.
- Arquivo `src/content/posts/AAAA-MM-DD-assunto.md`. A URL fica `/posts/assunto/` (a data sai).
- Imagens em `public/img/assunto/`.

## Código

- Sem framework de interface. O CSS fica em `src/styles/global.css`, com as cores em variáveis (tema claro e escuro).
- Fontes do manual da marca CodeTrix: Roboto (títulos em Black) e Roboto Mono, servidas pelo próprio blog
  (`@fontsource`, configuradas em `astro.config.mjs`).
- Ícones dos pilares em `src/components/IconePilar.astro` (traço em SVG, nada de emoji).
- A imagem do cartão do link (LinkedIn, WhatsApp) é gerada no build por `src/lib/imagem-social.ts`: `/og.png` para o
  site e `/og/assunto.png` para cada post.
- O Astro fica na versão 7.3 enquanto o Node do PC do Davi for mais antigo que o 22.22, que o Astro 7.4 exige.
- Antes de commitar, rode `npm run build`: ele roda a verificação (`scripts/verificar.mjs`) e depois o Astro.
- Commit e push só quando o Davi pedir. Push na `main` publica o site.
