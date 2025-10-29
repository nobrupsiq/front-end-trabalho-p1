const url = "https://marketjson-api.vercel.app/produtos";

let lista_de_produtos = [];
async function getProdutos() {
  const response = await fetch(url);
  const produtos = await response.json();
  lista_de_produtos = produtos;

  const produtoContainer = document.querySelector(
    ".visualizar-produto-content"
  );

  let html = "";
  produtoContainer.innerHTML = "";
  produtos.forEach((produto) => {
    html += `
      <div class="produto-card">
        <figure>
          <img src="${produto.imagem}">
          <figcaption>
            ${produto.nome}
          </figcaption>
        </figure>
        <div class="produto-info">
          <p class="preco">${produto.preco}</p>
        </div>
        <div class="botoes-container">
          <button class="btn btn-editar">Editar</button>
          <button class="btn btn-excluir">Excluir</button>
        </div>
      </div>
    `;
  });
  produtoContainer.innerHTML = html;
}
getProdutos();
