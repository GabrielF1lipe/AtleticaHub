const campeonatos = [
  {nome: "Uni League", modalidade: "League of Legends"},
  {nome: "IEM Atléticas", modalidade: "Counter-Strike 2"},
  {nome: "Copa Universitária", modalidade: "Futebol"},
  {nome: "Taça Pong", modalidade: "Ping Pong"},
  {nome: "cesta-feira", modalidade: "Basquete"}
];

const campoBusca = document.querySelector("#fieldText");
const listaResultados = document.querySelector("#resultados-busca");

if (campoBusca && listaResultados) {
  const campoBuscaContainer = campoBusca.closest(".campo-busca");

  function normalizar(texto) {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function fecharResultados() {
    listaResultados.hidden = true;
    campoBusca.setAttribute("aria-expanded", "false");
    campoBuscaContainer.classList.remove("resultados-abertos");
  }

  function mostrarResultados() {
    const termo = normalizar(campoBusca.value.trim());

    listaResultados.replaceChildren();
    const aberto = termo.length > 0;
    listaResultados.hidden = !aberto;
    campoBusca.setAttribute("aria-expanded", String(aberto));
    campoBuscaContainer.classList.toggle("resultados-abertos", aberto);

    if (!aberto) {
      return;
    }

    const encontrados = campeonatos.filter((campeonato) =>
      normalizar(`${campeonato.nome} ${campeonato.modalidade}`).includes(termo)
    );

    if (encontrados.length === 0) {
      const item = document.createElement("li");
      item.className = "resultado-busca__vazio";
      item.setAttribute("role", "option");
      item.setAttribute("aria-disabled", "true");
      item.textContent = "Nenhum campeonato encontrado.";
      listaResultados.append(item);
      return;
    }

    encontrados.forEach((campeonato) => {
      const item = document.createElement("li");
      item.setAttribute("role", "presentation");

      const opcao = document.createElement("button");
      opcao.type = "button";
      opcao.className = "resultado-busca__opcao";
      opcao.setAttribute("role", "option");

      const nome = document.createElement("span");
      nome.textContent = campeonato.nome;

      const modalidade = document.createElement("span");
      modalidade.className = "resultado-busca__modalidade";
      modalidade.textContent = campeonato.modalidade;

      opcao.append(nome, modalidade);
      item.append(opcao);
      listaResultados.append(item);
    });
  }

  campoBusca.addEventListener("input", mostrarResultados);

  listaResultados.addEventListener("click", (evento) => {
    const opcao = evento.target.closest(".resultado-busca__opcao");

    if (!opcao) {
      return;
    }

    campoBusca.value = opcao.querySelector("span").textContent;
    fecharResultados();
  });

  campoBusca.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      fecharResultados();
    }
  });
}