function iniciarNavegacao() {
  const cabecalho = document.querySelector(".cabecalho");
  const botao = document.querySelector(".menu-toggle");
  const navegacao = document.querySelector(".navegacao");

  if (!cabecalho || !botao || !navegacao) return;

  function definirEstado(aberto) {
    cabecalho.classList.toggle("menu-aberto", aberto);
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  }

  botao.addEventListener("click", () => {
    const aberto = botao.getAttribute("aria-expanded") === "true";
    definirEstado(!aberto);
  });

  navegacao.addEventListener("click", (evento) => {
    if (evento.target.closest("a") && window.innerWidth <= 700) {
      definirEstado(false);
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      definirEstado(false);
      botao.focus();
    }
  });

  document.addEventListener("click", (evento) => {
    if (!cabecalho.contains(evento.target)) definirEstado(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) definirEstado(false);
  });
}

document.addEventListener("DOMContentLoaded", iniciarNavegacao);
