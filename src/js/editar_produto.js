const editBtn = document.querySelector("#editBtn");
editBtn.addEventListener("click", editarProduto);

const url = "https://marketjson-api.vercel.app/produtos";

async function editarProduto(event) {
  event.preventDefault();

  const objetoProduto = {
    id: document.querySelector(".edit_id").value,
    nome: document.querySelector(".edit_nome").value,
    preco: document.querySelector(".edit_preco").value,
    imagem: document.querySelector(".edit_imagem").value,
  };
  alert("Produto editado com sucesso!");
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objetoProduto),
  }).then(() => window.location.reload());
}

// Função para popular o select com os produtos
async function popularSelectProdutos() {
  const select = document.querySelector("#edit_selecionar_produto");

  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const nomesProdutos = [];
      json.map((produto) => nomesProdutos.push(produto.nome));

      nomesProdutos.forEach((nome) => {
        const createOption = document.createElement("option");
        createOption.innerHTML = nome;
        createOption.value = nome;
        select.appendChild(createOption);
      });
    });
}
popularSelectProdutos();
