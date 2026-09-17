# ONG Mãos que Transformam

Projeto acadêmico iniciado na disciplina **Desenvolvimento FrontEnd - Experiência Prática 1** e ampliado nos Projetos Práticos 2 e 3. O site representa uma ONG fictícia e demonstra estrutura semântica em HTML5, acessibilidade, responsividade e validação de formulários.

As orientações de trabalho para o Codex estão em [AGENTS.md](AGENTS.md). O Projeto 3 é desenvolvido na branch `projeto-pratico-3` em uma worktree; as branches `main` e `projeto-pratico-2` preservam as entregas anteriores.

## Páginas

- `html/index.html`: apresentação institucional, áreas de atuação e contato.
- `html/projetos.html`: projetos sociais, orientações para doação e voluntariado.
- `html/cadastro.html`: formulário completo para futuros colaboradores.

## Funcionalidades

- HTML5 semântico com `header`, `nav`, `main`, `section`, `article`, `form` e `footer`.
- Hierarquia coerente de títulos e navegação acessível.
- Imagens informativas com texto alternativo nos formatos JPEG e WebP.
- Layout responsivo baseado em grid de 12 colunas, com breakpoints em 1200, 1024, 850, 700 e 480 pixels.
- Formulário organizado com `fieldset`, `legend` e `label`.
- Dez controles de cadastro, respeitando o limite de no máximo dez campos.
- Validações nativas com `required`, `pattern`, `maxlength` e tipos adequados.
- Máscaras progressivas para CPF, telefone e CEP em JavaScript.

## Estrutura de pastas

```text
ong-maos-que-transformam/
├── AGENTS.md
├── index.html
├── html/
│   ├── index.html
│   ├── projetos.html
│   └── cadastro.html
├── css/
│   └── estilos.css
├── js/
│   ├── mascaras.js
│   └── navegacao.js
├── imagens/
│   ├── voluntarios.jpg
│   ├── voluntarios.webp
│   ├── projeto-alimentos.jpg
│   └── projeto-alimentos.webp
├── tests/
│   ├── test_site.py
│   └── mascaras.test.mjs
├── requirements-dev.txt
└── docs/
    └── validacao-w3c.txt
```

## Como visualizar

O site não exige bibliotecas no navegador. Use um servidor local para carregar o módulo JavaScript das máscaras:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`. O `index.html` da raiz encaminha para `html/index.html`.

## Testes

Instale a dependência dos testes Python e execute as duas suítes:

```bash
python -m pip install -r requirements-dev.txt
python -m unittest discover -s tests -v
node --test tests/mascaras.test.mjs
```

O estado atual possui 13 testes Python e 6 testes JavaScript.

## Validação HTML

As três páginas foram submetidas ao [Nu HTML Checker do W3C](https://validator.w3.org/nu/) e terminaram sem erros. O registro está em `docs/validacao-w3c.txt`.

## Observação sobre dados

O formulário é demonstrativo. Nenhuma informação digitada é transmitida ou armazenada.
Projeto acadêmico de site semântico para uma ONG, desenvolvido com HTML5, CSS e JavaScript.

## Dependências dos testes

Python 3 com Pillow e Node.js 22 ou superior. As versões Python ficam declaradas em `requirements-dev.txt`. O site em si não possui dependências e usa somente HTML, CSS e JavaScript.

## Entrega e decisões

Consulte `docs/entrega.md` para a estrutura completa, os quatro textos da plataforma, as verificações e as instruções de GitHub. O PDF fornecido contém respostas anteriores; as instruções corrigidas do aluno estabelecem **no máximo dez campos**, sem determinar quais. Foram preservados os dez dados existentes; participação passou de dois radios para um select obrigatório. O botão de envio depende do JavaScript para impedir o envio real caso o módulo não carregue.

As imagens foram recuperadas do ZIP fornecido, sem substituição. O planejamento original foi preservado em `docs/superpowers/` como histórico; suas referências a dez campos obrigatórios e radios não são requisitos novos nem descrevem a versão final.

## Tags semânticas

`header` identifica o cabeçalho; `nav` reúne a navegação; `main` contém o conteúdo principal; `section` agrupa um assunto com título; `article` identifica uma iniciativa independente; `aside` apresenta informação complementar; `footer` encerra a página. No formulário, `fieldset` agrupa campos, `legend` nomeia o grupo e `label` identifica cada controle. `picture` oferece WebP com JPEG como alternativa, e `alt` descreve a imagem.

O cadastro é demonstrativo: as máscaras verificam formato, sem consultar CPF, CEP ou telefone em bases reais. Contatos e conteúdo representam uma ONG fictícia.
