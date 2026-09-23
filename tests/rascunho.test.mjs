import test from "node:test";
import assert from "node:assert/strict";

import {
  CHAVE_RASCUNHO,
  criarRascunho,
  lerRascunho,
  limparRascunho,
  salvarRascunho,
} from "../js/rascunho.js";

function armazenamentoFalso(inicial = {}) {
  const dados = { ...inicial };
  return {
    dados,
    getItem: (chave) => (chave in dados ? dados[chave] : null),
    setItem: (chave, valor) => { dados[chave] = String(valor); },
    removeItem: (chave) => { delete dados[chave]; },
  };
}

test("cria rascunho sem o CPF e sem campos vazios", () => {
  const rascunho = criarRascunho(
    [["nome", "Maria"], ["cpf", "529.982.247-25"], ["cidade", ""]],
    new Date("2026-09-22T12:00:00Z"),
  );
  assert.deepEqual(rascunho, {
    campos: { nome: "Maria" },
    salvoEm: "2026-09-22T12:00:00.000Z",
  });
});

test("grava o rascunho como string JSON e recupera o objeto", () => {
  const armazenamento = armazenamentoFalso();
  const rascunho = { campos: { nome: "Maria", estado: "SP" }, salvoEm: "2026-09-22T12:00:00.000Z" };

  salvarRascunho(rascunho, armazenamento);

  assert.equal(typeof armazenamento.dados[CHAVE_RASCUNHO], "string");
  assert.deepEqual(lerRascunho(armazenamento), rascunho);
});

test("ignora rascunho corrompido ou com estrutura inesperada", () => {
  assert.equal(lerRascunho(armazenamentoFalso({ [CHAVE_RASCUNHO]: "{quebrado" })), null);
  assert.equal(lerRascunho(armazenamentoFalso({ [CHAVE_RASCUNHO]: "[1, 2]" })), null);
  assert.equal(lerRascunho(armazenamentoFalso()), null);
});

test("remove o rascunho salvo", () => {
  const armazenamento = armazenamentoFalso({ [CHAVE_RASCUNHO]: "{}" });
  limparRascunho(armazenamento);
  assert.equal(armazenamento.getItem(CHAVE_RASCUNHO), null);
});
