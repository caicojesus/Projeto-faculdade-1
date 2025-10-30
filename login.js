document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("login-btn");
  const logoutMenu = document.getElementById("logout-menu");
  const logoutOption = document.getElementById("logout-option");
  const popupOverlay = document.getElementById("popup-overlay");
  const formLogin = document.getElementById("formLogin");
  const erroLogin = document.getElementById("erroLogin");
  const loginFormContainer = document.getElementById("login-form");

  function atualizarEstadoLogin() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (usuarioLogado) {
      loginBtn.textContent = `👤 ${usuarioLogado.login}`;
      loginBtn.disabled = false;
      logoutMenu.style.display = "none"; // garante que está fechado ao iniciar
    } else {
      loginBtn.textContent = "Login ou Registrar-se";
      loginBtn.disabled = false;
      logoutMenu.style.display = "none";
    }
  }

  // Toggle menu logout ou abrir popup login
  loginBtn.addEventListener("click", function (event) {
    event.stopPropagation(); // para não fechar menu imediatamente no clique
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuarioLogado) {
      // Toggle dropdown logout menu
      if (logoutMenu.style.display === "block") {
        logoutMenu.style.display = "none";
      } else {
        logoutMenu.style.display = "block";
      }
      if (popupOverlay) popupOverlay.style.display = "none";
      loginFormContainer.style.display = "none";
      erroLogin.style.display = "none";
    } else {
      // Abre popup de login
      if (popupOverlay) popupOverlay.style.display = "flex";
      logoutMenu.style.display = "none";
      loginFormContainer.style.display = "none"; // esconde o formulário até mostrar
      erroLogin.style.display = "none";
    }
  });

  // Fecha popup ao clicar no X (assumindo que existe botão com id popup-close)
  const popupClose = document.getElementById("popup-close");
  if (popupClose) {
    popupClose.addEventListener("click", () => {
      if (popupOverlay) popupOverlay.style.display = "none";
      loginFormContainer.style.display = "none";
      erroLogin.style.display = "none";
    });
  }

  // Logout
  if (logoutOption) {
    logoutOption.addEventListener("click", function () {
      localStorage.removeItem("usuarioLogado");
      atualizarEstadoLogin();
      logoutMenu.style.display = "none";
    });
  }

  // Fecha dropdown se clicar fora do botão e do menu
  document.addEventListener("click", function (event) {
    if (event.target !== loginBtn && !logoutMenu.contains(event.target)) {
      logoutMenu.style.display = "none";
    }
  });

  // Exibe o formulário de login no popup (supondo função chamada de fora)
  window.mostrarLogin = function () {
    loginFormContainer.style.display = "block";
    erroLogin.style.display = "none";
  };

  // Redireciona para página de registro (supondo função chamada de fora)
  window.registrar = function () {
    window.location.href = "registrar.html";
  };

  // Validação e submissão do form de login
  if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();

      const loginDigitado = document.getElementById("usuario").value.trim();
      const senhaDigitada = document.getElementById("senhaLogin").value;

      const registros = JSON.parse(localStorage.getItem("registrosUsuarios")) || [];

      const usuarioEncontrado = registros.find(user => user.login === loginDigitado && user.senha === senhaDigitada);

      if (usuarioEncontrado) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
        loginBtn.textContent = `👤 ${usuarioEncontrado.login}`;
        popupOverlay.style.display = "none";
        formLogin.reset();
        loginFormContainer.style.display = "none";
        erroLogin.style.display = "none";
        logoutMenu.style.display = "none";
      } else {
        erroLogin.textContent = "Login ou senha inválidos!";
        erroLogin.style.display = "block";
      }
    });
  }

  // Atualiza estado ao carregar a página
  atualizarEstadoLogin();
});


console.log("login.js carregado");

document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("login-btn");
  const logoutMenu = document.getElementById("logout-menu");
  const logoutOption = document.getElementById("logout-option");
  const popupOverlay = document.getElementById("popup-overlay");

  function atualizarEstadoLogin() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (usuarioLogado) {
      loginBtn.textContent = `👤 ${usuarioLogado.login}`;
      loginBtn.disabled = false;
    } else {
      loginBtn.textContent = "Login ou Registrar-se";
      loginBtn.disabled = false;
      logoutMenu.style.display = "none";
    }
  }

  loginBtn.addEventListener("click", function (event) {
    event.stopPropagation(); // Evita que o clique se propague e feche o menu imediatamente
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuarioLogado) {
      // Toggle dropdown logout menu usando display:flex para melhor controle visual
      if (logoutMenu.style.display === "flex") {
        logoutMenu.style.display = "none";
      } else {
        logoutMenu.style.display = "flex";
      }
      if (popupOverlay) popupOverlay.style.display = "none";
    } else {
      if (popupOverlay) popupOverlay.style.display = "flex";
      logoutMenu.style.display = "none";
    }
  });

  logoutOption.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    atualizarEstadoLogin();
    logoutMenu.style.display = "none";
  });

  // Fecha dropdown se clicar fora do menu e do botão
  document.addEventListener("click", function (event) {
    const alvo = event.target;
    if (alvo !== loginBtn && !logoutMenu.contains(alvo)) {
      logoutMenu.style.display = "none";
    }
  });

  atualizarEstadoLogin();
});
