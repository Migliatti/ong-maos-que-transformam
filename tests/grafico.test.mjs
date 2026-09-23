import test from "node:test";
import assert from "node:assert/strict";

import { configurarGrafico, dadosDaTabela } from "../js/grafico.js";

const linhas = [
  ["Mês", "Famílias atendidas", "Estudantes acompanhados"],
  ["Abr", "120", "40"],
  ["Mai", "1.035", "46"],
];

test("converte as linhas da tabela em rótulos e séries numéricas", () => {
  assert.deepEqual(dadosDaTabela(linhas), {
    rotulos: ["Abr", "Mai"],
    series: [
      { nome: "Famílias atendidas", valores: [120, 1035] },
      { nome: "Estudantes acompanhados", valores: [40, 46] },
    ],
  });
});

test("monta configuração de barras com uma cor por série", () => {
  const configuracao = configurarGrafico(dadosDaTabela(linhas), ["#111111", "#222222"]);

  assert.equal(configuracao.type, "bar");
  assert.deepEqual(configuracao.data.labels, ["Abr", "Mai"]);
  assert.deepEqual(configuracao.data.datasets.map((serie) => serie.backgroundColor), ["#111111", "#222222"]);
  assert.deepEqual(configuracao.data.datasets[0].data, [120, 1035]);
  assert.equal(configuracao.options.maintainAspectRatio, false);
});
