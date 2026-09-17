# Instruções do projeto para o Codex

## Contexto

- Responda em português do Brasil e atue como tutor de desenvolvimento web.
- Este repositório contém o site estático da ONG fictícia Mãos que Transformam. Os Projetos Práticos 1 e 2 já foram aceitos; o trabalho atual é o Projeto Prático 3.
- Consulte `README.md` para a estrutura e as instruções de execução. Confirme o estado real nos arquivos e no Git antes de descrever uma funcionalidade como concluída.
- Use as respostas da disciplina para explicar somente o que o código implementa de fato.

## Ao alterar o site

- Antes de editar, explique de forma simples o conceito que será aplicado. Ao terminar, diga o que mudou, como testar e quais conceitos foram usados.
- Preserve HTML semântico, acessibilidade, responsividade e a navegação entre as três páginas.
- As páginas ficam em `html/`; `css/`, `js/` e `imagens/` ficam na raiz. Ao mover arquivos, confira os caminhos relativos de links e recursos.
- Evite dependências e arquivos de configuração novos sem necessidade concreta. Mantenha o projeto utilizável como site estático.
- Trate `docs/entrega.md`, `docs/validacao-w3c.txt` e `docs/superpowers/` como registros históricos; verifique novamente o código atual antes de reutilizar suas afirmações.

## Git

- `main` preserva o Projeto Prático 1; `projeto-pratico-2` preserva o Projeto Prático 2; `projeto-pratico-3` é a branch de trabalho atual.
- Para tarefas do Projeto 3, trabalhe no checkout da branch `projeto-pratico-3`. Verifique `git branch --show-current` e `git status --short --branch` antes de editar.
- Faça commits locais pequenos por atividade relevante, usando Conventional Commits em português, depois de verificar status, diff e testes.
- Não faça push, merge, exclusão de branch ou mudança remota sem pedido explícito do estudante.

## Verificação

- Execute `python -m unittest discover -s tests -v` e `node --test tests/mascaras.test.mjs` após mudanças que afetem o site ou seus testes.
- Execute `git diff --check` antes do commit. Para caminhos de páginas ou recursos, confira também o carregamento por um servidor iniciado na raiz do projeto.
- Se `python` não estiver no PATH, localize um interpretador Python disponível antes de concluir que os testes não podem rodar.
