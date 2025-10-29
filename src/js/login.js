function fazerLogin() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  if (usuario === "vendedor" && senha === "1234") {
    localStorage.setItem("usuarioLogado", usuario);

    window.location.href = "../../assets/screens/menu_vendedor.html";
  } else {
    alert("Usuário ou senha incorretos!");
  }
}

function sair_da_conta() {
  window.location.href = "../../assets/screens/login.html";
  localStorage.removeItem("usuarioLogado");
}
