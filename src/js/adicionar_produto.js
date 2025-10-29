const adicionarNomeDoProduto = document.querySelector(".nome-produto");
const adicionarPrecoDoProduto = document.querySelector(".preco-produto");
const adicionarImagemDoProduto = document.querySelector(".imagem-produto");

const url = "https://marketjson-api.vercel.app/produtos";

// Adicionar produto
const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", adicionarProduto);

function adicionarProduto(e) {
  e.preventDefault();
  const objetoProduto = {
    id: document.querySelector("#produto_id").value,
    nome: adicionarNomeDoProduto.value,
    preco: adicionarPrecoDoProduto.value,
    imagem: adicionarImagemDoProduto.value,
  };
  alert("Produto adicionado com sucesso!");
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(objetoProduto),
  }).then(() => window.location.reload());
}
