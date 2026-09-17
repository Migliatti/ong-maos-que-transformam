# Templates dinâmicos dos alertas

## Objetivo

Gerar os três alertas da seção de feedback na página Projetos a partir de dados, sem repetir a marcação de cada componente no HTML. Preservar o estilo, o conteúdo e a navegação SPA existentes.

## Estrutura e fluxo

`html/projetos.html` contém um único `<template id="modelo-alerta">` com a estrutura comum e um contêiner `#lista-alertas`. `js/templates.js` mantém os dados de cada alerta: tipo, papel de acessibilidade, ícone, título e mensagem. A função `renderizarAlertas` percorre os dados, clona o template, preenche os textos com `textContent`, aplica a classe e o papel adequados, agrupa os elementos em um `DocumentFragment` e substitui o conteúdo do contêiner.

`js/spa.js` chama essa função no carregamento direto do documento e depois de trocar o conteúdo principal pela navegação SPA. Se a página atual não contém o template, a função termina sem alterar o DOM. Sem JavaScript, a seção apresenta uma mensagem em `<noscript>`.

## Verificação

O teste estrutural confirma que existe somente um modelo de alerta e um contêiner de destino. As suítes existentes verificam a estrutura geral e a navegação. No navegador, conferir os três alertas ao abrir Projetos diretamente e após ir a outra página e voltar pela SPA.
