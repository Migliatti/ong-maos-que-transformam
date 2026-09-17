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

function conectarMascara(id, formatador) {
  const campo = document.querySelector(`#${id}`);
  campo?.addEventListener("input", () => {
    campo.value = formatador(campo.value);
  });
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

  formulario?.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      return;
    }

    formulario.reset();
    if (mensagem) {
      mensagem.textContent = "Cadastro validado com sucesso! Nenhum dado foi armazenado.";
    }
    document.querySelector("#nome")?.focus();
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", iniciarFormulario);
}
