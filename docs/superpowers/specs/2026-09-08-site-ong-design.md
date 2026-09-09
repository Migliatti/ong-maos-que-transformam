# Site ONG Mãos que Transformam - Especificação

## Objetivo

Criar um site acadêmico estático, responsivo e acessível para a ONG fictícia Mãos que Transformam. O projeto deve demonstrar HTML5 semântico, navegação coerente, mídia otimizada e um formulário com validações nativas e máscaras brasileiras.

## Estrutura

- `index.html`: apresenta a ONG, sua missão, formas de atuação e contato.
- `projetos.html`: apresenta iniciativas solidárias, doações e voluntariado.
- `cadastro.html`: registra futuros colaboradores em um formulário de dez campos.
- `css/estilos.css`: concentra toda a apresentação visual e responsividade.
- `js/mascaras.js`: aplica máscaras de CPF, telefone e CEP e apresenta confirmação de envio.
- `imagens/`: contém as fotografias em JPEG e WebP.

As três páginas compartilham cabeçalho, navegação e rodapé. Cada página usa um único `h1`; `h2` divide as seções e `h3` identifica projetos específicos.

## Conteúdo e semântica

O site usa `header`, `nav`, `main`, `section`, `article`, `form`, `fieldset`, `legend`, `address` e `footer` conforme a função do conteúdo. Os links de navegação indicam a página atual com `aria-current="page"`. Fotografias informativas têm textos alternativos objetivos, e um link de salto permite chegar diretamente ao conteúdo principal.

## Formulário

O formulário contém exatamente dez campos de coleta:

1. Nome completo (`text`)
2. CPF (`text`)
3. Data de nascimento (`date`)
4. E-mail (`email`)
5. Telefone (`tel`)
6. CEP (`text`)
7. Endereço completo (`text`)
8. Cidade (`text`)
9. Estado/UF (`text`)
10. Forma de participação (`radio`, com as opções voluntariado e doação)

Os campos são agrupados em quatro `fieldset`: dados pessoais, dados de contato, endereço e participação. CPF, telefone e CEP usam `required`, `maxlength`, `inputmode="numeric"`, `pattern` e máscaras progressivas em JavaScript. Os demais campos obrigatórios usam tipos e restrições nativas apropriadas. A página informa sucesso apenas quando `checkValidity()` confirma todo o formulário.

## Aparência e responsividade

A identidade visual usa azul profundo, verde e tons claros. O layout prioriza leitura, contraste e áreas clicáveis confortáveis. Cartões de projetos mudam de múltiplas colunas para uma coluna em telas estreitas. As imagens usam `picture`, com WebP preferencial e JPEG como alternativa.

## Verificação

- Testes automatizados conferem arquivos, semântica, links, hierarquia, campos e padrões das máscaras.
- As páginas são submetidas ao Nu HTML Checker/W3C e devem terminar sem erros estruturais.
- Uma revisão visual em tamanhos desktop e móvel verifica legibilidade, alinhamento e ausência de rolagem horizontal.

## Limites

O projeto não possui servidor nem armazenamento de dados. O envio é demonstrativo e não persiste informações pessoais. Não serão usados frameworks ou bibliotecas externas.
