function fazerLogin() {
  // Captura os valores digitados
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  // Aqui você pode validar o login (exemplo simples)
  if (usuario === "vendedor" && senha === "1234") {
    // Redireciona para o menu do vendedor
    window.location.href = "../../assets/screens/menu_vendedor.html";
  } else {
    // Mostra alerta se usuário ou senha estiverem incorretos
    alert("Usuário ou senha incorretos!");
  }
}
