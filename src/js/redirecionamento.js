const cardAdicioanar = document.querySelector(".card-adicionar");
const cardEditar = document.querySelector(".card-editar");
const cardExcluir = document.querySelector(".card-excluir");
const cardVisualizar = document.querySelector(".card-visualizar");

cardAdicioanar.addEventListener("click", () => {
  window.location.href = "adicionar_produto.html";
});
cardEditar.addEventListener("click", () => {
  window.location.href = "editar_produto.html";
});
cardExcluir.addEventListener("click", () => {
  window.location.href = "excluir_produto.html";
});
cardVisualizar.addEventListener("click", () => {
  window.location.href = "visualizar_produto.html";
});

function fazerLogin() {
  // Captura os valores digitados
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;

  // Aqui você pode validar o login (exemplo simples)
  if (usuario === "vendedor" && senha === "1234") {
    // Redireciona para o menu do vendedor
    window.location.href = "../screens/menu_vendedor.html";
  } else {
    // Mostra alerta se usuário ou senha estiverem incorretos
    alert("Usuário ou senha incorretos!");
  }
}


