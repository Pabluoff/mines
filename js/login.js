// Lista de e-mails VIP
const emailsVIP = [
    "pabluo23cm@garnet.com",
    "trajadao@garnet.com",
    "Gabrin@garnet.com",
    "garnet@gmail.com",
    "pivetonez@gmail.com",
    "lucas28cm@gmail.com",
    "theusz@gmail.com",
  ];
  
  // Lista de e-mails padrão
  const emailsPadrao = [
    "acesso@garnet.com",
    "acessoteste@garnet.com",
  ];
  
  let acessoExpirado = false; // Flag para controlar o acesso expirado
  
  function verificarEmailSalvo() {
    const emailSalvo = localStorage.getItem("email");
  
    if (emailSalvo && !emailsPadrao.includes(emailSalvo) && !emailsVIP.includes(emailSalvo) && window.location.pathname !== "/") {
      window.location.href = "/";
    }
  
    const verifiedIcon = document.getElementById("verified-icon");
    if (verifiedIcon) {
      if (emailsVIP.includes(emailSalvo)) {
        verifiedIcon.style.display = "inline-block";
      } else {
        verifiedIcon.style.display = "none";
      }
    }
  
    // Verifica o e-mail teste
    if (emailSalvo === "acessoteste@garnet.com") {
      // Redireciona após 30 dias se o acesso não tiver expirado
      const loginTimestamp = localStorage.getItem("loginTimestamp");
      const agora = new Date().getTime();
      const diff = agora - loginTimestamp;
      const dias30ms = 30 * 24 * 60 * 60 * 1000;
  
      if (loginTimestamp && diff > dias30ms) {
        acessoExpirado = true; // Marca como acesso expirado
        localStorage.removeItem("email");
        localStorage.removeItem("nome");
        localStorage.removeItem("loginTimestamp");
        window.location.href = "/"; // Redireciona para a página inicial
      }
    }
  }
  
  // Chamada da função verificarEmailSalvo assim que a página carregar e a cada segundo
  document.addEventListener("DOMContentLoaded", () => {
    verificarEmailSalvo();
    recuperarEmailSalvo();
    carregarInformacoesUsuario();
    verificarConexaoInternet();
    
    restaurarNomeNoHeader(); // Adiciona a função para restaurar o nome no header
  
    // Verificação periódica a cada segundo
    setInterval(verificarEmailSalvo, 1000);
  });
  
  function restaurarNomeNoHeader() {
    const nomeUsuario = localStorage.getItem("nome");
    const nomeElemento = document.querySelector("header .user h1");
    
    if (nomeUsuario && nomeElemento) {
      nomeElemento.textContent = nomeUsuario;
    } else {
      console.log("Nenhum nome encontrado no localStorage ou elemento não existe.");
    }
  }
  
  // Função para verificar o e-mail durante o login
  function verificarEmail() {
    const emailInput = document.getElementById("email");
    const nomeInput = document.getElementById("nome");
    const emailValue = emailInput.value.trim();
    const nomeValue = nomeInput.value.trim();
    const loginButton = document.getElementById("login-button");
    const loading = document.querySelector(".loading");
    const loginText = document.getElementById("login-text");
    const arrowIcon = loginButton.querySelector("i");
  
    if (acessoExpirado) {
      exibirNotificacao("Acesso expirado, atualize seu plano.");
      return; // Impede o login
    }
  
    if (nomeValue === "") {
      exibirNotificacao("Por favor, insira seu nome.");
    } else if (emailValue === "") {
      exibirNotificacao("Por favor, insira um e-mail.");
    } else if (!isValidEmail(emailValue)) {
      exibirNotificacao("Por favor, insira um e-mail válido.");
    } else if (!emailsPadrao.includes(emailValue) && !emailsVIP.includes(emailValue)) {
      exibirNotificacao("Insira um e-mail existente.");
    } else {
      // Verifica se o e-mail já foi usado
      if (localStorage.getItem("emailLogado") === emailValue) {
        exibirNotificacao("Acesso expirado, atualize seu plano.");
        return; // Impede o login
      }
  
      loginText.style.visibility = "hidden";
      loading.style.display = "block";
      arrowIcon.style.visibility = "hidden";
      loginButton.classList.add("loading-active");
  
      // Armazena as informações no localStorage
      localStorage.setItem("email", emailValue);
      localStorage.setItem("nome", nomeValue);
      localStorage.setItem("emailLogado", emailValue); 
      localStorage.setItem("loginTimestamp", new Date().getTime()); 
  
      setTimeout(function () {
        exibirNotificacaoSucesso("Seu login foi realizado com sucesso!");
        setTimeout(function () {
          if (window.location.pathname === "/inicio") {
            loginText.style.visibility = "visible";
            arrowIcon.style.visibility = "visible";
            loading.style.display = "none";
            loginButton.classList.remove("loading-active");
          }
  
          window.location.href = "/inicio";
        }, 1000);
      }, 3000);
    }
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function exibirNotificacao(mensagem) {
    const notification = document.getElementById("notification");
    const notificationText = document.getElementById("notification-text");
    notificationText.textContent = mensagem;
  
    notification.classList.remove("slide-out");
    notification.classList.add("slide-in");
  
    setTimeout(function () {
      fecharNotificacao();
    }, 3000);
  }
  
  function fecharNotificacao() {
    const notification = document.getElementById("notification");
    notification.classList.remove("slide-in");
    notification.classList.add("slide-out");
  }
  
  function exibirNotificacaoSucesso(mensagem) {
    const notificationSuccess = document.getElementById("notification-success");
    const notificationSuccessText = document.getElementById("notification-success-text");
    notificationSuccessText.textContent = mensagem;
  
    notificationSuccess.classList.remove("slide-out");
    notificationSuccess.classList.add("slide-in");
  
    setTimeout(function () {
      fecharNotificacaoSucesso();
    }, 3000);
  }
  
  function fecharNotificacaoSucesso() {
    const notificationSuccess = document.getElementById("notification-success");
    notificationSuccess.classList.remove("slide-in");
    notificationSuccess.classList.add("slide-out");
  }
  
  function recuperarEmailSalvo() {
    const email = localStorage.getItem("email");
    const nome = localStorage.getItem("nome");
  
    if (email) {
      const emailInput = document.getElementById("email");
      if (emailInput) {
        emailInput.value = email;
      }
    }
    if (nome) {
      const nomeInput = document.getElementById("nome");
      if (nomeInput) {
        nomeInput.value = nome;
      }
    }
  }
  
  function carregarInformacoesUsuario() {
    const userEmail = localStorage.getItem("email");
    const userMailElement = document.getElementById("user-email");
    const userNameElement = document.getElementById("user-name");
  
    if (userEmail) {
      const nome = localStorage.getItem("nome");
      if (nome) {
        userNameElement.textContent = nome.toLowerCase();
      }
      const nomeUsuario = userEmail.split("@")[0];
      userMailElement.textContent = nomeUsuario;
    } else {
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
  }
  
  function fazerLogout() {
    localStorage.removeItem("email");
    localStorage.removeItem("nome");
    localStorage.removeItem("emailLogado"); 
    localStorage.removeItem("loginTimestamp");
    acessoExpirado = false; 
    window.location.href = "/";
  }
  
  document.getElementById("logout").addEventListener("click", fazerLogout);
  