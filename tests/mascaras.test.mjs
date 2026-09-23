import test from "node:test";
import assert from "node:assert/strict";

import {
  dataNascimentoEValida,
  emailEValido,
  mascararCEP,
  mascararCPF,
  mascararTelefone,
  mensagemDeErro,
  validarCPF,
} from "../js/mascaras.js";


test("formata CPF e descarta dígitos excedentes", () => {
  assert.equal(mascararCPF("12345678900"), "123.456.789-00");
  assert.equal(mascararCPF("123.456.789-00123"), "123.456.789-00");
});

test("mantém a máscara de CPF progressiva durante a digitação", () => {
  assert.equal(mascararCPF("1234"), "123.4");
  assert.equal(mascararCPF("1234567"), "123.456.7");
});

test("formata telefone celular e descarta dígitos excedentes", () => {
  assert.equal(mascararTelefone("11987654321"), "(11) 98765-4321");
  assert.equal(mascararTelefone("(11) 98765-432199"), "(11) 98765-4321");
});

test("mantém a máscara de telefone progressiva durante a digitação", () => {
  assert.equal(mascararTelefone("1"), "(1");
  assert.equal(mascararTelefone("11987"), "(11) 987");
});

test("formata CEP, preserva zero inicial e corta excedentes", () => {
  assert.equal(mascararCEP("01234567"), "01234-567");
  assert.equal(mascararCEP("01234-56789"), "01234-567");
});

test("mantém a máscara de CEP progressiva durante a digitação", () => {
  assert.equal(mascararCEP("0123"), "0123");
  assert.equal(mascararCEP("012345"), "01234-5");
});

test("aceita CPF com dígitos verificadores corretos", () => {
  assert.equal(validarCPF("529.982.247-25"), true);
});

test("rejeita CPF com dígito verificador incorreto ou números repetidos", () => {
  assert.equal(validarCPF("529.982.247-24"), false);
  assert.equal(validarCPF("111.111.111-11"), false);
});

test("rejeita data de nascimento futura", () => {
  const hoje = new Date(2026, 8, 16);
  assert.equal(dataNascimentoEValida("2026-09-17", hoje), false);
  assert.equal(dataNascimentoEValida("2000-01-01", hoje), true);
});

test("exige e-mail com usuário, domínio e extensão", () => {
  assert.equal(emailEValido("maria@ong.org.br"), true);
  assert.equal(emailEValido("maria@ong"), false);
  assert.equal(emailEValido("maria ong@site.com"), false);
});

test("usa mensagem específica para o formato de cada campo", () => {
  const formatoInvalido = { patternMismatch: true };
  assert.equal(mensagemDeErro({ id: "telefone", validity: formatoInvalido }),
    "Digite o telefone com DDD: (00) 00000-0000.");
  assert.equal(mensagemDeErro({ id: "cep", validity: formatoInvalido }),
    "Digite os 8 números do CEP: 00000-000.");
  assert.equal(mensagemDeErro({ id: "nome", validity: { valueMissing: true } }),
    "Preencha este campo.");
});
