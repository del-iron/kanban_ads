// Impedir que o usuário volte para a página de login após o login
if (window.location.pathname.includes('login.html')) {
  if (sessionStorage.getItem('loggedIn') === 'true') {
    console.log('Usuário já está logado. Redirecionando para a página principal...');
    window.location.href = '../board-de-tarefas/index.html';
  }
}

document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.querySelector('input[name="email"]').value.trim();
  const password = document.querySelector('input[name="password"]').value.trim();

  try {
    const response = await fetch('./php/users/process_login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (result.success) {
      sessionStorage.setItem('loggedIn', 'true'); // Marcar como logado
      sessionStorage.setItem('userId', result.userId); // Armazenar o ID do usuário
      sessionStorage.setItem('userName', result.userName); // Armazenar o nome do usuário
      window.location.href = '../board-de-tarefas/index.html';
    } else {
      alert(result.message || 'E-mail ou senha inválidos.');
    }
  } catch (error) {
    console.error('Erro ao processar o login:', error);
    alert('Ocorreu um erro. Tente novamente mais tarde.');
  }
});

// Add event listener for "Criar uma nova conta" button
document.getElementById('create-account-btn').addEventListener('click', function () {
  window.location.href = './php/users/register.php';
});
