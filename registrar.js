// MÁSCARA CPF
function aplicarMascaraCPF(campo) {
  campo.addEventListener('input', function () {
    let valor = campo.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    campo.value = valor;
  });
}

// MÁSCARA TELEFONE
function aplicarMascaraTelefone(campo, tipo) {
  campo.addEventListener('input', function () {
    let numeros = campo.value.replace(/\D/g, '');

    if (tipo === 'celular') {
      numeros = numeros.slice(0, 13);
    } else {
      numeros = numeros.slice(0, 12);
    }

    let formatado = '';
    if (numeros.length > 2) {
      formatado = `(+55) `;

      const ddd = numeros.slice(2, 4);
      formatado += ddd;

      if (tipo === 'celular') {
        const parte1 = numeros.slice(4, 9);
        const parte2 = numeros.slice(9, 13);
        if (parte1) formatado += ` ${parte1}`;
        if (parte2) formatado += ` ${parte2}`;
      } else {
        const parte1 = numeros.slice(4, 8);
        const parte2 = numeros.slice(8, 12);
        if (parte1) formatado += ` ${parte1}`;
        if (parte2) formatado += ` ${parte2}`;
      }
    } else {
      formatado = '(+55)';
    }

    campo.value = formatado.trim();
  });
}

// APLICA MÁSCARAS AO CARREGAR
document.addEventListener('DOMContentLoaded', function () {
  const cpfInput = document.getElementById('cpf');
  const telCelularInput = document.getElementById('telCelular');
  const telFixoInput = document.getElementById('telFixo');

  aplicarMascaraCPF(cpfInput);
  aplicarMascaraTelefone(telCelularInput, 'celular');
  aplicarMascaraTelefone(telFixoInput, 'fixo');
});

// VALIDAR CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = 11 - (soma % 11);
  if (resto >= 10) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = 11 - (soma % 11);
  if (resto >= 10) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;

  return true;
}

// VALIDAÇÃO AO ENVIAR FORMULÁRIO
document.getElementById('formCadastro').addEventListener('submit', function (e) {
  const cpfInput = document.getElementById('cpf');
  const cpf = cpfInput.value;
  const erroCPF = document.getElementById('erroCPF');

  const senha = document.getElementById('senha').value;
  const confirmaSenha = document.getElementById('confirmaSenha').value;
  const erroSenha = document.getElementById('erroSenha');

  let formularioValido = true;

  // Validação do CPF
  if (!validarCPF(cpf)) {
    cpfInput.classList.add('erro');
    erroCPF.textContent = 'CPF inválido. Verifique e tente novamente.';
    formularioValido = false;
  } else {
    cpfInput.classList.remove('erro');
    erroCPF.textContent = '';
  }

  // Validação de Senha
  if (senha !== confirmaSenha) {
    document.getElementById('confirmaSenha').classList.add('erro');
    erroSenha.textContent = 'As senhas não coincidem.';
    formularioValido = false;
  } else {
    document.getElementById('confirmaSenha').classList.remove('erro');
    erroSenha.textContent = '';
  }

  if (!formularioValido) {
    e.preventDefault();
  }
});

// FEEDBACK VISUAL DINÂMICO (CPF e SENHA)
const cpfInput = document.getElementById('cpf');
cpfInput.addEventListener('input', function () {
  const cpfNumeros = cpfInput.value.replace(/\D/g, '');
  const erroCPF = document.getElementById('erroCPF');

  if (cpfNumeros.length === 11 && validarCPF(cpfInput.value)) {
    cpfInput.classList.add('valido');
    cpfInput.classList.remove('invalido', 'erro');
    erroCPF.textContent = '';
  } else if (cpfNumeros.length === 11) {
    cpfInput.classList.remove('valido');
    cpfInput.classList.add('invalido');
  } else {
    cpfInput.classList.remove('valido', 'invalido');
    erroCPF.textContent = '';
  }
});

// FEEDBACK DINÂMICO DA CONFIRMAÇÃO DE SENHA
const senhaInput = document.getElementById('senha');
const confirmaInput = document.getElementById('confirmaSenha');
const erroSenha = document.getElementById('erroSenha');

confirmaInput.addEventListener('input', function () {
  if (confirmaInput.value !== senhaInput.value) {
    confirmaInput.classList.add('erro');
    erroSenha.textContent = 'As senhas não coincidem.';
  } else {
    confirmaInput.classList.remove('erro');
    erroSenha.textContent = '';
  }
});

// VIA CEP
document.addEventListener('DOMContentLoaded', function () {
  const cepInput = document.getElementById('cep');
  const erroCEP = document.getElementById('erroCEP');

  cepInput.addEventListener('input', function () {
    let valor = cepInput.value.replace(/\D/g, '');

    if (valor.length > 5) {
      valor = valor.slice(0, 5) + '-' + valor.slice(5, 8);
    }

    cepInput.value = valor;

    if (valor.replace('-', '').length === 8) {
      buscarCEP(valor.replace('-', ''));
    }
  });

  function buscarCEP(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        if (!response.ok) throw new Error("CEP não encontrado");
        return response.json();
      })
      .then(data => {
        if (data.erro) throw new Error("CEP inválido");

        document.getElementById('logradouro').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';
        erroCEP.textContent = '';
        cepInput.classList.remove('erro');
      })
      .catch(error => {
        erroCEP.textContent = 'Erro ao buscar CEP: ' + error.message;
        cepInput.classList.add('erro');
      });
  }
});

/* envio de formulario de registro*/
document.getElementById("formCadastro").addEventListener("submit", function (e) {
  e.preventDefault(); // Impede o envio real do formulário

  const form = e.target;

  // Verifica se o CPF é válido (supondo que já tenha a função validarCPF definida)
  const cpf = form.cpf.value.replace(/\D/g, '');
  if (!validarCPF(cpf)) {
    exibirMensagem("CPF inválido. Verifique e tente novamente.", false);
    return;
  }

  // Verifica se as senhas batem
  const senha = form.senha.value;
  const confirmaSenha = form.confirmaSenha.value;

  if (senha !== confirmaSenha) {
    exibirMensagem("As senhas não coincidem.", false);
    return;
  }

  // Coleta os dados
  const novoUsuario = {
    nome: form.nome.value.trim(),
    nascimento: form.nascimento.value,
    sexo: form.sexo.value,
    nomeMaterno: form.nomeMaterno.value.trim(),
    cpf: cpf,
    email: form.email.value.trim(),
    telCelular: form.telCelular.value,
    telFixo: form.telFixo.value,
    cep: form.cep.value,
    logradouro: form.logradouro.value,
    numero: form.numero.value,
    bairro: form.bairro.value,
    cidade: form.cidade.value,
    estado: form.estado.value,
    login: form.login.value.trim(),
    senha: form.senha.value // Em produção, nunca salve senhas assim!
  };

  // Pega usuários já salvos ou cria array novo
  const usuariosSalvos = JSON.parse(localStorage.getItem("registrosUsuarios")) || [];

  // Verifica se o login já existe
  const loginExistente = usuariosSalvos.find(user => user.login === novoUsuario.login);
  if (loginExistente) {
    exibirMensagem("Este login já está em uso. Escolha outro.", false);
    return;
  }

  // Salva novo usuário
  usuariosSalvos.push(novoUsuario);
  localStorage.setItem("registrosUsuarios", JSON.stringify(usuariosSalvos));

  // Exibe mensagem de sucesso
  exibirMensagem("Usuário cadastrado com sucesso!", true);

  // Limpa o formulário
  form.reset();
});

/*mensagem de log q some apos alguns segundos*/
function exibirMensagem(msg, sucesso = true) {
  const divMsg = document.getElementById("mensagemSalvar");
  divMsg.textContent = msg;
  divMsg.style.display = "block";
  divMsg.style.color = sucesso ? "green" : "red";

  // Esconde depois de alguns segundos
  setTimeout(() => {
    divMsg.style.display = "none";
  }, 4000);
}
