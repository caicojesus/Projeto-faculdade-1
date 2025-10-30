document.addEventListener("DOMContentLoaded", function () {
  const searchToggle = document.getElementById("search-toggle");
  const searchContainer = document.getElementById("search-container");
  const loginBtn = document.getElementById("login-btn");
  const popup = document.getElementById("popup-overlay");
  const popupClose = document.getElementById("popup-close");
  const formLogin = document.getElementById("formLogin");
  const erroLogin = document.getElementById("erroLogin");
  const loginFormContainer = document.getElementById("login-form");
  const btnLimpar = document.getElementById("btn-limpar-login");
  const btnMostrarLogin = document.getElementById("btn-login-popup");
  const btnRegistrar = document.getElementById("btn-registrar-popup");
  const logoutMenu = document.getElementById("logout-menu");
  const logoutOption = document.getElementById("logout-option");

  // Mostra/esconde barra de pesquisa ao clicar na lupa
  searchToggle.addEventListener("click", () => {
    if (searchContainer.style.display === "none" || searchContainer.style.display === "") {
      searchContainer.style.display = "flex";
    } else {
      searchContainer.style.display = "none";
    }
  });

  // Abre popup ao clicar no botão de login, se não estiver logado
  loginBtn.addEventListener("click", () => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) {
      popup.style.display = "flex";
      erroLogin.style.display = "none";
      loginFormContainer.style.display = "none";
    } else {
      // Mostrar menu de logout
      logoutMenu.style.display = logoutMenu.style.display === "block" ? "none" : "block";
    }
  });

  // Fecha popup ao clicar no X
  popupClose.addEventListener("click", () => {
    popup.style.display = "none";
    loginFormContainer.style.display = "none";
    erroLogin.style.display = "none";
    formLogin.reset();
  });

  // Mostra o formulário de login
  btnMostrarLogin.addEventListener("click", () => {
    loginFormContainer.style.display = "block";
    erroLogin.style.display = "none";
  });

  // Redireciona para a página de registro
  btnRegistrar.addEventListener("click", () => {
    window.location.href = "registrar.html";
  });

  // Limpa campos do formulário
  btnLimpar.addEventListener("click", () => {
    formLogin.reset();
    erroLogin.textContent = "";
    erroLogin.style.display = "none";
  });

  // Submete login
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const loginDigitado = document.getElementById("usuario").value.trim();
    const senhaDigitada = document.getElementById("senhaLogin").value;

    const registros = JSON.parse(localStorage.getItem("registrosUsuarios")) || [];
    const usuarioEncontrado = registros.find(user => user.login === loginDigitado && user.senha === senhaDigitada);

    if (usuarioEncontrado) {
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
      loginBtn.textContent = `👤 ${usuarioEncontrado.login}`;
      popup.style.display = "none";
      formLogin.reset();
      loginFormContainer.style.display = "none";
      erroLogin.style.display = "none";
    } else {
      erroLogin.textContent = "Login ou senha inválidos!";
      erroLogin.style.display = "block";
    }
  });

  // Mostra nome do usuário logado ao carregar
  function atualizarEstadoLogin() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (usuarioLogado) {
      loginBtn.textContent = `👤 ${usuarioLogado.login}`;
    } else {
      loginBtn.textContent = "Login ou Registrar-se";
    }
  }

  // Logout
  logoutOption.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    atualizarEstadoLogin();
    logoutMenu.style.display = "none";
  });

  atualizarEstadoLogin();
});
