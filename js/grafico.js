// Chart.js é carregado da CDN só nas páginas que têm o gráfico. A versão fixa e o
// hash de integridade garantem que o navegador execute exatamente o arquivo esperado.
const CHART_JS = {
  src: "https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js",
  integrity: "sha384-jb8JQMbMoBUzgWatfe6COACi2ljcDdZQ2OxczGA3bGNeWe+6DChMTBJemed7ZnvJ",
};

let carregamento = null;

function carregarChart(documento) {
  if (globalThis.Chart) return Promise.resolve(globalThis.Chart);

  carregamento ??= new Promise((resolver, rejeitar) => {
    const script = documento.createElement("script");
    script.src = CHART_JS.src;
    script.integrity = CHART_JS.integrity;
    script.crossOrigin = "anonymous";
    script.referrerPolicy = "no-referrer";
    script.addEventListener("load", () => resolver(globalThis.Chart));
    script.addEventListener("error", () => {
      carregamento = null;
      script.remove();
      rejeitar(new Error("Chart.js indisponível"));
    });
    documento.head.append(script);
  });

  return carregamento;
}

export function dadosDaTabela(linhas) {
  const [cabecalho, ...corpo] = linhas;
  return {
    rotulos: corpo.map((linha) => linha[0]),
    series: cabecalho.slice(1).map((nome, indice) => ({
      nome,
      valores: corpo.map((linha) => Number(linha[indice + 1].replace(/\D/g, ""))),
    })),
  };
}

export function configurarGrafico(dados, cores, animar = true) {
  return {
    type: "bar",
    data: {
      labels: dados.rotulos,
      datasets: dados.series.map((serie, indice) => ({
        label: serie.nome,
        data: serie.valores,
        backgroundColor: cores[indice % cores.length],
        borderRadius: 6,
      })),
    },
    options: {
      maintainAspectRatio: false,
      animation: animar ? {} : false,
      plugins: { legend: { position: "bottom" } },
      scales: { y: { beginAtZero: true } },
    },
  };
}

export async function renderizarGrafico(documento) {
  const figura = documento.querySelector("#grafico-impacto");
  const canvas = figura?.querySelector("canvas");
  const tabela = figura?.querySelector("table");
  if (!canvas || !tabela) return;

  const linhas = Array.from(tabela.rows, (linha) => Array.from(linha.cells, (celula) => celula.textContent.trim()));
  const estilos = getComputedStyle(documento.documentElement);
  const cores = ["--verde-700", "--azul-700"].map((variavel) => estilos.getPropertyValue(variavel).trim());
  const animar = !matchMedia("(prefers-reduced-motion: reduce)").matches;

  try {
    const Chart = await carregarChart(documento);
    // A navegação SPA pode ter trocado a página enquanto a biblioteca carregava.
    if (!canvas.isConnected) return;
    Chart.defaults.font.family = estilos.getPropertyValue("--fonte").trim();
    Chart.getChart(canvas)?.destroy();
    // A área do gráfico precisa estar visível para o Chart.js medir o canvas.
    figura.classList.add("grafico-carregado");
    new Chart(canvas, configurarGrafico(dadosDaTabela(linhas), cores, animar));
  } catch {
    figura.classList.remove("grafico-carregado");
    // Sem a CDN, a tabela com os mesmos dados continua visível.
  }
}
