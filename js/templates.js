const alertas = [
  {
    tipo: "informacao",
    papel: "status",
    icone: "i",
    titulo: "Informação",
    mensagem: "As inscrições para a próxima ação encerram-se na sexta-feira.",
  },
  {
    tipo: "sucesso",
    papel: "status",
    icone: "✓",
    titulo: "Cadastro confirmado",
    mensagem: "Recebemos os seus dados e entraremos em contacto.",
  },
  {
    tipo: "atencao",
    papel: "alert",
    icone: "!",
    titulo: "Atenção",
    mensagem: "Revise os campos obrigatórios antes de continuar.",
  },
];

export function renderizarAlertas(raiz) {
  const modelo = raiz.querySelector("#modelo-alerta");
  const destino = raiz.querySelector("#lista-alertas");
  if (!modelo || !destino) return;

  const fragmento = raiz.createDocumentFragment();
  for (const alerta of alertas) {
    const elemento = modelo.content.firstElementChild.cloneNode(true);
    elemento.classList.add(`alerta-${alerta.tipo}`);
    elemento.setAttribute("role", alerta.papel);
    elemento.querySelector(".alerta-icone").textContent = alerta.icone;
    elemento.querySelector("strong").textContent = alerta.titulo;
    elemento.querySelector("p").textContent = alerta.mensagem;
    fragmento.append(elemento);
  }

  destino.replaceChildren(fragmento);
}
