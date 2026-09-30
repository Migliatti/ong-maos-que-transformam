# ONG Mãos que Transformam

Projeto acadêmico desenvolvido para a disciplina **Desenvolvimento FrontEnd**, evoluído até a **Experiência Prática 4** (versionamento, acessibilidade e deploy). O site representa uma ONG fictícia e demonstra estrutura semântica em HTML5, acessibilidade, responsividade e validação de formulários.

## Páginas

- `index.html`: apresentação institucional, áreas de atuação e contato.
- `projetos.html`: projetos sociais, orientações para doação e voluntariado.
- `cadastro.html`: formulário completo para futuros colaboradores.

## Funcionalidades

- HTML5 semântico com `header`, `nav`, `main`, `section`, `article`, `form` e `footer`.
- Hierarquia coerente de títulos e navegação acessível.
- Imagens informativas com texto alternativo nos formatos JPEG e WebP.
- Layout responsivo para computadores e dispositivos móveis.
- Formulário organizado com `fieldset`, `legend` e `label`.
- Dez controles de cadastro, respeitando o limite de no máximo dez campos.
- Validações nativas com `required`, `pattern`, `maxlength` e tipos adequados.
- Máscaras progressivas para CPF, telefone e CEP em JavaScript.

## Estrutura de pastas

```text
ong-maos-que-transformam/
├── index.html
├── projetos.html
├── cadastro.html
├── css/
│   └── estilos.css
├── js/
│   └── mascaras.js
├── imagens/
│   ├── voluntarios.jpg
│   ├── voluntarios.webp
│   ├── projeto-alimentos.jpg
│   └── projeto-alimentos.webp
├── tests/
│   ├── test_site.py
│   └── mascaras.test.mjs
└── docs/
    └── validacao-w3c.txt
```

## Como visualizar

O site não exige bibliotecas no navegador. Use um servidor local para carregar o módulo JavaScript das máscaras:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Testes

```bash
python -m unittest discover -s tests -v
node --test tests/mascaras.test.mjs
```

## Validação HTML

As três páginas foram submetidas ao [Nu HTML Checker do W3C](https://validator.w3.org/nu/) e terminaram sem erros. O registro está em `docs/validacao-w3c.txt`.

## Observação sobre dados

O formulário é demonstrativo. Nenhuma informação digitada é transmitida ou armazenada.
Projeto acadêmico de site semântico para uma ONG, desenvolvido com HTML5, CSS e JavaScript.

## Dependências dos testes

Python 3 com Pillow (`python -m pip install Pillow`) e Node.js 24 ou superior. O site usa somente HTML, CSS e JavaScript.

## Entrega e decisões

Consulte `docs/entrega.md` para a estrutura completa, os quatro textos da plataforma, as verificações e as instruções de GitHub. O PDF fornecido contém respostas anteriores; as instruções corrigidas do aluno estabelecem **no máximo dez campos**, sem determinar quais. Foram preservados os dez dados existentes; participação passou de dois radios para um select obrigatório. O botão de envio depende do JavaScript para impedir o envio real caso o módulo não carregue.

As imagens foram recuperadas do ZIP fornecido, sem substituição. O planejamento original foi preservado em `docs/superpowers/` como histórico; suas referências a dez campos obrigatórios e radios não são requisitos novos nem descrevem a versão final.

## Tags semânticas

`header` identifica o cabeçalho; `nav` reúne a navegação; `main` contém o conteúdo principal; `section` agrupa um assunto com título; `article` identifica uma iniciativa independente; `aside` apresenta informação complementar; `footer` encerra a página. No formulário, `fieldset` agrupa campos, `legend` nomeia o grupo e `label` identifica cada controle. `picture` oferece WebP com JPEG como alternativa, e `alt` descreve a imagem.

O cadastro é demonstrativo: as máscaras verificam formato, sem consultar CPF, CEP ou telefone em bases reais. Contatos e conteúdo representam uma ONG fictícia.


## Instalação e uso

```bash
git clone https://github.com/Migliatti/ong-maos-que-transformam.git
cd ong-maos-que-transformam
python3 -m pip install Pillow      # necessário para testes e build
python3 -m http.server 8000        # desenvolvimento em http://localhost:8000
```

## Build de produção

```bash
python3 scripts/build.py
```

Gera `dist/` com HTML, CSS e JS minificados e imagens redimensionadas (máx. 1200 px) e recomprimidas. Economia medida: 848 KB para 438 KB (48,4%); relatório em `docs/relatorio-otimizacao.txt`.

## Fluxo de versionamento (GitFlow)

| Branch | Uso |
| --- | --- |
| `main` | Código publicado em produção; recebe apenas releases e hotfixes, marcados com tag (`v1.0.0`) |
| `develop` | Integração das funcionalidades |
| `feature/*` | Uma branch por funcionalidade, criada a partir de `develop` |
| `release/*` | Preparação de versão (changelog, ajustes finais) |
| `hotfix/*` | Correção urgente a partir de `main` |

Commits seguem [Conventional Commits](https://www.conventionalcommits.org/pt-br/): `feat:`, `fix:`, `docs:`, `build:`, `test:`. Cada experiência prática vive em sua própria branch (`projeto-pratico-N`). Histórico de versões em `CHANGELOG.md`.

## Acessibilidade

O site segue a WCAG 2.1 nível AA: contraste mínimo, foco visível, link de salto, formulário com rótulos, dicas e mensagens de erro acessíveis, e respeito a `prefers-reduced-motion`. Detalhes em `docs/acessibilidade.md`.

## Deploy

Publicação automática no GitHub Pages a cada push na branch `projeto-pratico-4` (`.github/workflows/deploy.yml`): testes, build e publicação de `dist/`. Endereço: https://migliatti.github.io/ong-maos-que-transformam/

## Manutenção

1. Crie `feature/<nome>` a partir de `develop`.
2. Rode `python3 -m unittest discover -s tests -v` e `node --test tests/mascaras.test.mjs`.
3. Abra pull request para `develop`; releases seguem para `main` via PR.
4. Atualize `CHANGELOG.md` a cada versão.
