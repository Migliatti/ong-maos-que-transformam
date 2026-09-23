export const CHAVE_RASCUNHO = "maos-que-transformam:rascunho-cadastro";

// O CPF é um dado sensível e nunca vai para o armazenamento do navegador.
const camposIgnorados = new Set(["cpf"]);

function armazenamentoPadrao() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

export function criarRascunho(entradas, agora = new Date()) {
  const campos = {};
  for (const [nome, valor] of entradas) {
    if (!camposIgnorados.has(nome) && typeof valor === "string" && valor !== "") {
      campos[nome] = valor;
    }
  }
  return { campos, salvoEm: agora.toISOString() };
}

export function salvarRascunho(rascunho, armazenamento = armazenamentoPadrao()) {
  try {
    armazenamento?.setItem(CHAVE_RASCUNHO, JSON.stringify(rascunho));
  } catch {
    // Sem espaço ou com o armazenamento bloqueado, o formulário segue funcionando.
  }
}

export function lerRascunho(armazenamento = armazenamentoPadrao()) {
  try {
    const texto = armazenamento?.getItem(CHAVE_RASCUNHO);
    if (!texto) return null;

    const rascunho = JSON.parse(texto);
    const camposValidos = rascunho?.campos && typeof rascunho.campos === "object"
      && !Array.isArray(rascunho.campos);
    return camposValidos && typeof rascunho.salvoEm === "string" ? rascunho : null;
  } catch {
    return null;
  }
}

export function limparRascunho(armazenamento = armazenamentoPadrao()) {
  try {
    armazenamento?.removeItem(CHAVE_RASCUNHO);
  } catch {
    // Nada a limpar quando o armazenamento não está disponível.
  }
}

export function restaurarRascunho(formulario, rascunho) {
  let restaurados = 0;
  for (const [nome, valor] of Object.entries(rascunho.campos)) {
    const campo = formulario.elements.namedItem(nome);
    if (!campo || camposIgnorados.has(nome) || typeof valor !== "string") continue;
    campo.value = valor;
    if (campo.value === valor) restaurados++;
  }
  return restaurados;
}
