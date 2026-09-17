# Navegação SPA do Projeto Prático 3

## Objetivo

Trocar o conteúdo principal entre Início, Projetos e Cadastro sem recarregar o documento durante a navegação interna, mantendo URLs acessíveis diretamente e uma resposta acadêmica fiel ao código.

## Abordagem

As três páginas em `html/` continuam sendo documentos HTML completos e servem como entrada direta e alternativa caso o JavaScript falhe. Um módulo `js/spa.js`, carregado nas três páginas, intercepta cliques simples em links internos que apontam para essas páginas. Ele busca o documento de destino, usa `DOMParser` para extrair `main#conteudo` e troca somente os filhos do `main` atual. Cabeçalho, rodapé e folha de estilos continuam montados.

Depois da troca, o módulo atualiza `document.title`, a meta description e `aria-current` no menu, registra a URL com `history.pushState`, posiciona a rolagem e o foco no conteúdo. `popstate` busca e renderiza a URL ao usar Voltar ou Avançar, sem criar uma nova entrada no histórico. Links de âncora na mesma página continuam com o comportamento nativo; links externos, `mailto:` e `tel:` não são interceptados. Um token de navegação evita que respostas antigas de `fetch` substituam uma página mais recente.

O formulário de cadastro precisa ser inicializado depois que seu HTML entra no DOM. `js/mascaras.js` passa a exportar sua função de inicialização, que é chamada no carregamento direto e após a renderização SPA. O botão de envio demonstrativo permanece desabilitado se o JavaScript não estiver disponível.

## Falhas e acessibilidade

Se a busca falhar ou não houver `main#conteudo` válido, a navegação usa o link normal para que o servidor entregue a página completa. O botão Voltar/Avançar mantém URL, título e conteúdo coerentes. O foco vai para o `h1` depois da troca, e o item ativo recebe `aria-current="page"`.

## Verificação

Testar rotas internas, âncoras, histórico, abertura direta e recarga das três URLs, formulário após navegação dinâmica e comportamento com JavaScript indisponível. Executar as suítes Python e Node existentes e adicionar testes específicos para o roteamento.
