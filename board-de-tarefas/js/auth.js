// Redirecionar para a página de login se o usuário não estiver logado
export function checkAuthentication() {
    if (sessionStorage.getItem('loggedIn') !== 'true') {
        window.location.href = '../auth/login.html';
    }
}

// Exibir o nome do usuário no canto superior direito
export function displayUserName() {
    const userName = sessionStorage.getItem('userName');
    if (userName) {
        document.getElementById('user-name').textContent = `Bem-vindo, ${userName}`;
    }
}

// Função para deslogar o usuário
export function logout() {
    document.getElementById('logout-btn').addEventListener('click', function () {
        sessionStorage.clear();
        window.location.href = '../auth/login.html';
    });
}
