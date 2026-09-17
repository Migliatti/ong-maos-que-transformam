import test from "node:test";
import assert from "node:assert/strict";

import { rotaInterna } from "../js/spa.js";

const diretorio = new URL("http://localhost:8000/html/");

test("aceita somente as tres paginas internas da aplicacao", () => {
  assert.equal(rotaInterna("http://localhost:8000/html/index.html", diretorio), true);
  assert.equal(rotaInterna("http://localhost:8000/html/projetos.html", diretorio), true);
  assert.equal(rotaInterna("http://localhost:8000/html/cadastro.html#cpf", diretorio), true);
  assert.equal(rotaInterna("http://localhost:8000/outra/projetos.html", diretorio), false);
  assert.equal(rotaInterna("https://outro.site/html/index.html", diretorio), false);
  assert.equal(rotaInterna("http://localhost:8000/html/desconhecida.html", diretorio), false);
});

test("reconhece rotas quando o site e servido em um subdiretorio", () => {
  const base = new URL("https://exemplo.org/projeto/html/");
  assert.equal(rotaInterna("https://exemplo.org/projeto/html/projetos.html", base), true);
  assert.equal(rotaInterna("https://exemplo.org/html/projetos.html", base), false);
});
