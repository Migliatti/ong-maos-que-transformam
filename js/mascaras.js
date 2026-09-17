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

function atualizarRegraPersonalizada(campo) {
  if (campo.id === "cpf") {
    campo.setCustomValidity(campo.value && !validarCPF(campo.value)
      ? "Digite um CPF válido."
      : "");
  }

  if (campo.id === "nascimento") {
    campo.setCustomValidity(campo.value && !dataNascimentoEValida(campo.value)
      ? "A data de nascimento não pode estar no futuro."
      : "");
  }
}

function mensagemDeErro(campo) {
  if (campo.validity.valueMissing) return "Preencha este campo.";
  if (campo.validity.typeMismatch) return "Digite um e-mail válido.";
  if (campo.validity.tooShort) return "Digite mais caracteres.";
  if (campo.validity.patternMismatch) return "Use o formato indicado.";
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

  formulario?.addEventListener("invalid", (evento) => {
    validarCampo(evento.target);
  }, true);

  formulario?.addEventListener("blur", (evento) => {
    if (evento.target.matches("input, select, textarea")) validarCampo(evento.target);
  }, true);

  formulario?.addEventListener("input", (evento) => {
    if (evento.target.matches("input, select, textarea") && evento.target.dataset.verificado) {
      validarCampo(evento.target);
    }
  });

  formulario?.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      return;
    }

    formulario.reset();
    limparEstadoFormulario(formulario);
    if (mensagem) {
      mensagem.textContent = "Cadastro validado com sucesso! Nenhum dado foi armazenado.";
    }
    document.querySelector("#nome")?.focus();
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", iniciarFormulario);
}
