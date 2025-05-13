// Verifica se o usuário já está logado ao acessar a página de login
if (window.location.pathname.includes('login.html')) {
  // Se o usuário já estiver logado, redireciona para a página principal
  if (sessionStorage.getItem('loggedIn') === 'true') {
    console.log('Usuário já está logado. Redirecionando para a página principal...');
    window.location.href = '../board-de-tarefas/index.html';
  }
}

// Adiciona um evento ao formulário de login para processar o envio
document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault(); // Impede o comportamento padrão de recarregar a página

  // Obtém os valores dos campos de e-mail e senha
  const email = document.querySelector('input[name="email"]').value.trim();
  const password = document.querySelector('input[name="password"]').value.trim();

  try {
    // Envia os dados de login para o backend via requisição POST
    const response = await fetch('./php/users/process_login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
      },
      body: JSON.stringify({ email, password }), // Envia os dados no corpo da requisição
    });

    // Converte a resposta do backend para JSON
    const result = await response.json();

    if (result.success) {
      // Se o login for bem-sucedido, armazena os dados do usuário no sessionStorage
      sessionStorage.setItem('loggedIn', 'true'); // Marca o usuário como logado
      sessionStorage.setItem('userId', result.userId); // Armazena o ID do usuário
      sessionStorage.setItem('userName', result.userName); // Armazena o nome do usuário

      // Redireciona para a página principal
      window.location.href = '../board-de-tarefas/index.html';
    } else {
      // Exibe uma mensagem de erro caso o login falhe
      alert(result.message || 'E-mail ou senha inválidos.');
    }
  } catch (error) {
    // Trata erros de conexão ou outros problemas
    console.error('Erro ao processar o login:', error);
    alert('Ocorreu um erro. Tente novamente mais tarde.');
  }
});

// Adiciona um evento ao botão "Criar uma nova conta"
document.getElementById('create-account-btn').addEventListener('click', function () {
  // Redireciona para a página de registro
  window.location.href = './php/users/register.php';
});
