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
