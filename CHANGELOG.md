# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e versionamento semântico.

## [1.0.0] - 2026-09-29

### Adicionado
- Build de produção (`scripts/build.py`) com minificação de HTML, CSS e JS e otimização de imagens.
- Dicas visíveis de formato para CPF, telefone e CEP, ligadas por `aria-describedby`.
- Resumo de erros do formulário com `aria-invalid` e foco no primeiro campo inválido.
- Workflow de deploy no GitHub Pages (`.github/workflows/deploy.yml`).
- Auditoria de acessibilidade em `docs/acessibilidade.md`.

### Adicionado (modos de cor)
- Modo escuro (`prefers-color-scheme: dark`) e alto contraste (`prefers-contrast: more`).

### Alterado
- Etiqueta da seção escura com contraste 7,5:1.
- Borda dos campos e rótulo da seção verde com contraste conforme WCAG 2.1 AA.
- Indicador de foco visível em fundos claros e escuros.
- Imagens abaixo da dobra com `loading="lazy"`; imagem principal com `fetchpriority="high"`.

## [0.1.0] - 2026-09-08
- Site semântico com três páginas, formulário com máscaras e validação W3C.
