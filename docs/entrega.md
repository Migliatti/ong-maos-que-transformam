# Entrega da atividade

## Conformidade final

- Três páginas semânticas e navegação entre elas: atendido.
- No máximo dez campos: atendido, nove inputs e um select obrigatório.
- Labels, títulos, descrições, textos alternativos e foco visível: presentes.
- Validações nativas e máscaras de CPF, telefone e CEP: verificadas.
- Imagens JPEG e WebP: quatro arquivos recuperados do ZIP, 1600 × 1067 pixels.
- Organização: HTML na raiz, CSS, JavaScript, imagens, testes e documentação separados, conforme o planejamento fornecido.
- W3C: três páginas sem erros e sem avisos; respostas brutas e hashes em docs.

## Alterações e verificações

Foram recuperados os nove arquivos ausentes do ZIP. Os arquivos que já existiam eram idênticos aos do pacote e não foram substituídos na extração. Depois foram alterados cadastro.html (participação em select e proteção do envio sem JavaScript), css/estilos.css (select e contraste de textos pequenos em fundos claros), js/mascaras.js (habilitação do envio demonstrativo), tests/test_site.py (limite de controles), README.md e docs/validacao-w3c.txt. Nenhum arquivo original foi removido.

Passaram nove testes Python e seis testes Node. No Microsoft Edge sem interface, as três páginas carregaram em larguras de 390 e 1366 pixels, sem transbordamento horizontal e com imagens carregadas. Foram conferidas as três máscaras, a aceitação do formulário válido, a rejeição de e-mail inválido e a confirmação demonstrativa. Esses testes não substituem uma auditoria completa de acessibilidade.

## Textos para os quatro campos da plataforma

### 1. Assets e recursos

O projeto inclui duas imagens ilustrativas da ONG fictícia: voluntários organizando doações e voluntários separando alimentos. Cada imagem está disponível em JPEG e WebP na pasta imagens, com dimensões de 1600 × 1067 pixels. O elemento picture oferece WebP e utiliza JPEG como alternativa; os elementos img têm textos alternativos descritivos. Os quatro arquivos foram recuperados do pacote original e mantidos. A pasta css contém os estilos compartilhados, e js contém as máscaras de CPF, telefone e CEP. Envio esses recursos junto com o código completo.

### 2. Estrutura organizada de pastas

Na raiz estão index.html, projetos.html, cadastro.html, README.md e .gitignore. A pasta css contém estilos.css; js contém mascaras.js; imagens contém voluntarios.jpg, voluntarios.webp, projeto-alimentos.jpg e projeto-alimentos.webp. A pasta tests contém test_site.py e mascaras.test.mjs. A pasta docs reúne validacao-w3c.txt, as três respostas JSON do validador e entrega.md; docs/superpowers/plans e docs/superpowers/specs preservam os documentos originais de planejamento.

### 3. Código-fonte completo

O projeto apresenta a ONG em index.html, suas iniciativas em projetos.html e o cadastro de voluntários ou doadores em cadastro.html. O formulário possui dez controles, com validações nativas e máscaras de CPF, telefone e CEP. As três páginas foram validadas no W3C sem erros e sem avisos. O pacote completo inclui HTML, CSS, JavaScript, imagens e documentação. Repositório de entrega: https://github.com/Migliatti/ong-maos-que-transformam . Antes de submeter este link, confirmar que os arquivos finais foram enviados ao GitHub.

### 4. Resultado da validação W3C

Os arquivos index.html, projetos.html e cadastro.html foram enviados individualmente ao Nu HTML Checker do W3C pelo serviço https://validator.w3.org/nu/?out=json. Nas três respostas, a versão informada foi 26.9.7 e a lista messages estava vazia, indicando ausência de erros e avisos nesta execução. Não houve erros do W3C a corrigir nesta revalidação. O registro anterior do pacote relata uma alteração de autocomplete para address-line1; esse valor já estava presente nos arquivos recebidos e o erro histórico não foi reproduzido. A versão final substitui os dois botões de opção de participação por um select, para manter dez controles, preservando voluntariado e doação. As respostas JSON e os hashes SHA-256 dos HTML estão em docs, permitindo identificar os arquivos efetivamente validados.

## Enviar ao GitHub

Na pasta do projeto, executar os comandos abaixo. A branch main já está selecionada. Confira o diff antes do commit. Não use force push.

```powershell
git status
git diff
git add .gitignore README.md index.html projetos.html cadastro.html css js imagens tests docs
git commit -m "Conclui site semantico da ONG e registra validacao W3C"
git push origin main
```

Se o push indicar alterações remotas, interrompa e revise a integração antes de continuar. Depois abra o repositório e confirme que CSS, JavaScript, imagens e docs aparecem. O link do repositório dá acesso ao código; não pressupõe GitHub Pages configurado. Nenhum commit ou push foi feito durante esta revisão.

## Arquivos finais

```text
.gitignore
README.md
cadastro.html
css/estilos.css
docs/entrega.md
docs/superpowers/plans/2026-09-08-site-ong.md
docs/superpowers/specs/2026-09-08-site-ong-design.md
docs/validacao-w3c.txt
docs/w3c-cadastro.html.json
docs/w3c-index.html.json
docs/w3c-projetos.html.json
imagens/projeto-alimentos.jpg
imagens/projeto-alimentos.webp
imagens/voluntarios.jpg
imagens/voluntarios.webp
index.html
js/mascaras.js
projetos.html
tests/mascaras.test.mjs
tests/test_site.py
```
