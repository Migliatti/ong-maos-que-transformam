import { renderizarGrafico } from "./grafico.js";
import { iniciarFormulario } from "./mascaras.js";
import { renderizarAlertas } from "./templates.js";

const paginas = new Set(["index.html", "projetos.html", "cadastro.html"]);
const diretorioHtml = new URL("../html/", import.meta.url);

export function rotaInterna(destino, diretorio = diretorioHtml) {
  try {
    const url = new URL(destino, diretorio);
    return (url.protocol === "http:" || url.protocol === "https:")
      && url.origin === diretorio.origin
      && url.pathname.startsWith(diretorio.pathname)
      && paginas.has(url.pathname.slice(diretorio.pathname.length))
      && !url.search;
  } catch {
    return false;
  }
}

if (typeof document !== "undefined") {
  let paginaAtual = window.location.pathname;
  let pedidoAtual = 0;

  function atualizarMenu(caminho) {
    for (const link of document.querySelectorAll(".menu > li > a")) {
      const url = new URL(link.href);
      if (!url.hash && url.pathname === caminho) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  }

  function posicionarPagina(url, conteudoNovo) {
    const alvo = url.hash && document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (alvo) {
      alvo.setAttribute("tabindex", "-1");
      alvo.focus({ preventScroll: true });
      alvo.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
      if (conteudoNovo) {
        const titulo = document.querySelector("main#conteudo h1");
        titulo?.setAttribute("tabindex", "-1");
        titulo?.focus({ preventScroll: true });
      }
    }
  }

  async function mostrarPagina(url, adicionarHistorico) {
    const pedido = ++pedidoAtual;

    try {
      const resposta = await fetch(url.pathname, { headers: { Accept: "text/html" } });
      if (!resposta.ok) throw new Error("Página indisponível");

      const pagina = new DOMParser().parseFromString(await resposta.text(), "text/html");
      const origem = pagina.querySelector("main#conteudo");
      const destino = document.querySelector("main#conteudo");
      if (!origem || !destino || !pagina.title) throw new Error("Conteúdo inválido");
      if (pedido !== pedidoAtual) return;

      if (adicionarHistorico) history.pushState(null, "", url.href);
      destino.replaceChildren(...Array.from(origem.childNodes, (no) => document.importNode(no, true)));
      document.title = pagina.title;

      const descricao = pagina.querySelector('meta[name="description"]')?.content;
      const metaAtual = document.querySelector('meta[name="description"]');
      if (descricao && metaAtual) metaAtual.content = descricao;

      paginaAtual = url.pathname;
      atualizarMenu(url.pathname);
      iniciarFormulario();
      renderizarAlertas(document);
      renderizarGrafico(document);
      posicionarPagina(url, true);
    } catch {
      if (pedido === pedidoAtual) window.location.assign(url.href);
    }
  }

  document.addEventListener("click", (evento) => {
    if (evento.defaultPrevented || evento.button !== 0 || evento.metaKey
      || evento.ctrlKey || evento.shiftKey || evento.altKey) return;

    const link = evento.target.closest("a[href]");
    if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;

    const url = new URL(link.href);
    if (!rotaInterna(url, diretorioHtml)) return;
    if (url.pathname === window.location.pathname && url.hash) return;

    evento.preventDefault();
    if (url.pathname === paginaAtual) {
      pedidoAtual++;
      if (url.href !== window.location.href) history.pushState(null, "", url.href);
      posicionarPagina(url, false);
    } else {
      mostrarPagina(url, true);
    }
  });

  window.addEventListener("popstate", () => {
    const url = new URL(window.location.href);
    if (!rotaInterna(url, diretorioHtml)) return;
    if (url.pathname === paginaAtual) {
      pedidoAtual++;
      posicionarPagina(url, false);
    } else {
      mostrarPagina(url, false);
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    renderizarAlertas(document);
    renderizarGrafico(document);
  });
}
