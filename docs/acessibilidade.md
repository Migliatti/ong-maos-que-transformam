# Auditoria de acessibilidade (WCAG 2.1, nível AA)

Auditoria manual das três páginas, feita na branch `feature/acessibilidade-wcag`.

## Já atendido antes desta etapa

| Critério | Evidência |
| --- | --- |
| 1.1.1 Conteúdo não textual | Todas as `img` têm `alt` descritivo; ícones decorativos usam `aria-hidden`. |
| 1.3.1 Informação e relações | HTML semântico, `fieldset`/`legend`, `label` associado a cada controle. |
| 2.4.1 Contornar blocos | Link "Ir para o conteúdo principal" em todas as páginas. |
| 2.4.7 Foco visível | `:focus-visible` com contorno de 4 px. |
| 3.1.1 Idioma da página | `lang="pt-BR"`. |
| 2.3.3 / animações | `prefers-reduced-motion` desativa rolagem suave e transições. |

## Problemas encontrados e corrigidos

| # | Critério | Problema | Correção |
| --- | --- | --- | --- |
| 1 | 1.4.11 Contraste não textual | Borda dos campos `#aebdc2` sobre branco: 1,93:1 | Borda de 2 px em `#6b7c84` (4,3:1 sobre branco) |
| 2 | 1.4.3 Contraste mínimo | Rótulo `.chapeu` da seção verde: 4,46:1 | Cor `#e3f7ee` (5,3:1) |
| 3 | 3.3.1 Identificação de erro | Erros dependiam só de cor e do balão nativo | Mensagem de resumo com os campos inválidos, `aria-invalid` e foco no primeiro campo com erro |
| 4 | 3.3.2 Rótulos ou instruções | Formato de CPF, telefone e CEP só no `title` | Dicas visíveis ligadas por `aria-describedby` |
| 6 | 1.4.11 / 2.4.7 Foco | Contorno amarelo `#ffbf47` sobre fundo claro: 1,64:1 | Contorno azul-escuro (`#0b2638`, 9,5:1 sobre azul e mais de 15:1 sobre branco) com anel amarelo externo, visível em fundos claros e escuros |
| 5 | 1.4.1 Uso de cor | Estado inválido só por cor da borda | Faixa lateral e texto de erro |

## Navegação por teclado

Ordem de tabulação segue a ordem visual: link de salto, menu, conteúdo, formulário, rodapé. Nenhuma armadilha de foco. O botão de envio recebe foco e aciona com Enter/Espaço.

## Limitações

Auditoria manual e por cálculo de contraste; não foi feito teste com leitor de tela real.
