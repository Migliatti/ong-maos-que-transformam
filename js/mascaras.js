import {
  criarRascunho,
  lerRascunho,
  limparRascunho,
  restaurarRascunho,
  salvarRascunho,
} from "./rascunho.js";

function somenteDigitos(valor, limite) {
  return String(valor).replace(/\D/g, "").slice(0, limite);
}

export function mascararCPF(valor) {
  const digitos = somenteDigitos(valor, 11);

  return digitos
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

export function mascararTelefone(valor) {
  const digitos = somenteDigitos(valor, 11);

  if (digitos.length === 0) return "";
  if (digitos.length <= 2) return `(${digitos}`;

  const ddd = digitos.slice(0, 2);
  const numero = digitos.slice(2);

  if (numero.length <= 5) return `(${ddd}) ${numero}`;
  return `(${ddd}) ${numero.slice(0, 5)}-${numero.slice(5)}`;
}

export function mascararCEP(valor) {
  const digitos = somenteDigitos(valor, 8);
  if (digitos.length <= 5) return digitos;
  return `${digitos.slice(0, 5)}-${digitos.slice(5)}`;
}

export function validarCPF(valor) {
  const cpf = somenteDigitos(valor, 11);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  function calcularDigito(tamanho) {
    const soma = cpf.slice(0, tamanho).split("").reduce(
      (total, digito, indice) => total + Number(digito) * (tamanho + 1 - indice),
      0,
    );
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  }

  return calcularDigito(9) === Number(cpf[9])
    && calcularDigito(10) === Number(cpf[10]);
}

export function dataNascimentoEValida(valor, hoje = new Date()) {
  const partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(valor);
  if (!partes) return false;

  const [, ano, mes, dia] = partes.map(Number);
  const data = new Date(ano, mes - 1, dia);
  const inicioHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

  return data.getFullYear() === ano && data.getMonth() === mes - 1
    && data.getDate() === dia && data <= inicioHoje;
}

function conectarMascara(id, formatador) {
  const campo = document.querySelector(`#${id}`);
  campo?.addEventListener("input", () => {
    campo.value = formatador(campo.value);
  });
}

export function emailEValido(valor) {
  // Exige texto antes do @, domínio e ao menos uma extensão (ex.: .org, .com.br).
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(valor);
}

const mensagensDeFormato = {
  cpf: "Digite os 11 números do CPF: 000.000.000-00.",
  telefone: "Digite o telefone com DDD: (00) 00000-0000.",
  cep: "Digite os 8 números do CEP: 00000-000.",
  estado: "Digite a sigla do estado com duas letras, como SP.",
};

function atualizarRegraPersonalizada(campo) {
  let erro = "";

  if (campo.type === "text" && campo.value && !campo.value.trim()) {
    erro = "O campo não pode conter apenas espaços.";
  } else if (campo.id === "cpf" && campo.value.length === 14 && !validarCPF(campo.value)) {
    erro = "Digite um CPF válido.";
  } else if (campo.id === "nascimento" && campo.value && !dataNascimentoEValida(campo.value)) {
    erro = "A data de nascimento não pode estar no futuro.";
  } else if (campo.id === "email" && campo.value && !emailEValido(campo.value)) {
    erro = "Digite um e-mail completo, como nome@exemplo.com.";
  }

  campo.setCustomValidity(erro);
}

export function mensagemDeErro(campo) {
  const { validity } = campo;
  if (validity.valueMissing) return "Preencha este campo.";
  if (validity.patternMismatch) return mensagensDeFormato[campo.id] || "Use o formato indicado.";
  if (validity.typeMismatch) return "Digite um e-mail completo, como nome@exemplo.com.";
  if (validity.tooShort) return `Digite pelo menos ${campo.minLength} caracteres.`;
  return campo.validationMessage || "Verifique este campo.";
}

function validarCampo(campo) {
  atualizarRegraPersonalizada(campo);
  const grupo = campo.closest(".campo");
  const mensagemAnterior = grupo?.querySelector(".mensagem-erro-campo");
  const idMensagem = `erro-${campo.id}`;

  campo.dataset.verificado = "true";
  campo.setAttribute("aria-invalid", String(!campo.validity.valid));

  if (campo.validity.valid) {
    grupo?.classList.remove("campo-invalido");
    grupo?.classList.add("campo-valido");
    mensagemAnterior?.remove();
    campo.removeAttribute("aria-describedby");
    return true;
  }

  grupo?.classList.remove("campo-valido");
  grupo?.classList.add("campo-invalido");
  const mensagem = mensagemAnterior || document.createElement("p");
  mensagem.id = idMensagem;
  mensagem.className = "mensagem-erro-campo";
  mensagem.setAttribute("aria-live", "polite");
  mensagem.textContent = mensagemDeErro(campo);
  if (!mensagemAnterior) grupo?.append(mensagem);
  campo.setAttribute("aria-describedby", idMensagem);
  return false;
}

function limparEstadoFormulario(formulario) {
  for (const campo of formulario.elements) {
    if (!campo.matches?.("input, select, textarea")) continue;
    campo.closest(".campo")?.classList.remove("campo-invalido", "campo-valido");
    campo.removeAttribute("aria-invalid");
    campo.removeAttribute("aria-describedby");
    delete campo.dataset.verificado;
  }
  formulario.querySelectorAll(".mensagem-erro-campo").forEach((mensagem) => mensagem.remove());
}

export function iniciarFormulario() {
  conectarMascara("cpf", mascararCPF);
  conectarMascara("telefone", mascararTelefone);
  conectarMascara("cep", mascararCEP);

  const estado = document.querySelector("#estado");
  estado?.addEventListener("input", () => {
    estado.value = estado.value.replace(/[^a-z]/gi, "").toUpperCase().slice(0, 2);
  });

  const formulario = document.querySelector("#cadastro-form");
  const mensagem = document.querySelector("#mensagem-formulario");

  // Habilita o botão apenas quando o envio demonstrativo está disponível.
  formulario?.querySelector("button[type=submit]")?.removeAttribute("disabled");

  // Com JavaScript ativo, o script assume os avisos; sem ele, a validação nativa continua valendo.
  if (formulario) formulario.noValidate = true;

  const rascunho = formulario && lerRascunho();
  if (rascunho && restaurarRascunho(formulario, rascunho) > 0 && mensagem) {
    const salvoEm = new Date(rascunho.salvoEm).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
    mensagem.textContent = `Rascunho de ${salvoEm} restaurado. Revise os dados e informe o CPF.`;
  }

  formulario?.addEventListener("blur", (evento) => {
    if (evento.target.matches("input, select, textarea")) validarCampo(evento.target);
  }, true);

  formulario?.addEventListener("input", (evento) => {
    if (evento.target.matches("input, select, textarea") && evento.target.dataset.verificado) {
      validarCampo(evento.target);
    }
    salvarRascunho(criarRascunho(new FormData(formulario)));
  });

  formulario?.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const campos = Array.from(formulario.elements)
      .filter((campo) => campo.matches?.("input, select, textarea"));
    const invalidos = campos.filter((campo) => !validarCampo(campo));

    if (invalidos.length > 0) {
      if (mensagem) {
        mensagem.classList.add("mensagem-formulario-erro");
        mensagem.textContent = invalidos.length === 1
          ? "Corrija o campo destacado para enviar o cadastro."
          : `Corrija os ${invalidos.length} campos destacados para enviar o cadastro.`;
      }
      invalidos[0].focus();
      return;
    }

    formulario.reset();
    limparEstadoFormulario(formulario);
    limparRascunho();
    if (mensagem) {
      mensagem.classList.remove("mensagem-formulario-erro");
      mensagem.textContent = "Cadastro validado com sucesso! Nenhum dado foi armazenado.";
    }
    document.querySelector("#nome")?.focus();
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", iniciarFormulario);
}
