const url = "https://marketjson-api.vercel.app/produtos";

export let lista_de_produtos = [];
export async function getProdutos() {
  const response = await fetch(url);
  const produtos = await response.json();
  lista_de_produtos = produtos;

  const produtoContainer = document.querySelector(
    ".visualizar-produto-content"
  );

  if (!produtoContainer) return;
  let html = "";
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
          <p class="preco">R$ ${produto.preco}</p>
        </div>
        <div class="botoes-container">
          <button class="btn btn-editar">Editar</button>
          <button class="btn btn-excluir" data-id="${produto.id}">Excluir</button>
        </div>
      </div>
    `;
  });
  produtoContainer.innerHTML = html;
  const botoesExcluir = document.querySelectorAll(".btn-excluir");
  botoesExcluir.forEach((btn) => {
    btn.addEventListener("click", deletarProduto);
  });

  const botoesEditar = document.querySelectorAll(".btn-editar");
  botoesEditar.forEach((btn) => {
    btn.addEventListener("click", editarProduto);
  });
}

getProdutos();

function deletarProduto(event) {
  const id = event.currentTarget.dataset.id;
  event.preventDefault();
  const objProduto = { id: id };
  if (confirm("TEM CERTEZA QUE DESE JA EXCLUIR O PRODUTO SELECIONADO?")) {
    alert("PRODUTO EXCLUÍDO COM SUCESSO!");
    fetch(`${url}/${objProduto.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objProduto),
    }).then(() => window.location.reload());
  }
}

function editarProduto(event) {
  const id = event.currentTarget.dataset.id;
  window.location.href = `editar_produto.html?id=${id}`;
}
