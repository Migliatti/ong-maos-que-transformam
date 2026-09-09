import test from "node:test";
import assert from "node:assert/strict";

import {
  mascararCEP,
  mascararCPF,
  mascararTelefone,
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
