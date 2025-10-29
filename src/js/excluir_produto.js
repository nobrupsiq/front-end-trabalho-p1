import { lista_de_produtos, getProdutos } from "./visualizar_produto.js";

const url = "https://marketjson-api.vercel.app/produtos";

const selectProduto = document.querySelector(".del-select-produto");

function selectProdutoDelete() {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const produtos = [];
      json.map((produto) => produtos.push(produto.nome));

      produtos.forEach((produto) => {
        const option = document.createElement("option");
        option.innerHTML = produto;
        option.value = produto;
        selectProduto.appendChild(option);
      });
    });
}
selectProdutoDelete();

await getProdutos();
const deleteBtn = document.querySelector("#delBtn");
deleteBtn.addEventListener("click", deletarProduto);
function deletarProduto(event) {
  event.preventDefault();
  const objProduto = {
    id: lista_de_produtos.find((event) => event.nome === selectProduto.value)
      .id,
  };
  if (confirm("TEM CERTEZA QUE DESEJA EXCLUIR O PRODUTO SELECIONADO?")) {
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
