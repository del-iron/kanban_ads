<!-- filepath: c:\xampp\htdocs\kanban_ads080525\auth\php\users\register.php -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <!-- Metadados da página -->
    <meta charset="UTF-8"> <!-- Define a codificação de caracteres como UTF-8 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Torna a página responsiva -->
    <title>Registrar</title> <!-- Título da página -->
    <link rel="stylesheet" href="register.css"> <!-- Link para o arquivo CSS que estiliza a página -->
</head>
<body>
    <!-- Barra superior com o botão para voltar à página de login -->
    <div class="top-bar">
        <a href="#" id="back-to-login" class="back-to-login">Volte para logar</a> <!-- Botão para voltar ao login -->
    </div>

    <!-- Container principal do formulário de registro -->
    <div class="register-container">
        <h1>Criar conta</h1> <!-- Título do formulário -->

        <!-- Exibe uma mensagem de feedback, se houver -->
        <?php if (isset($_GET['message'])): ?>
            <p class="feedback"><?php echo htmlspecialchars($_GET['message']); ?></p> <!-- Mensagem de feedback -->
        <?php endif; ?>

        <!-- Formulário de registro -->
        <form action="process_register.php" method="POST"> <!-- Envia os dados para o script process_register.php -->
            <label for="email">E-mail:</label> <!-- Rótulo para o campo de e-mail -->
            <input type="email" id="email" name="email" required> <!-- Campo de entrada para o e-mail -->

            <label for="password">Senha:</label> <!-- Rótulo para o campo de senha -->
            <input type="password" id="password" name="password" required> <!-- Campo de entrada para a senha -->

            <label for="confirm-password">Confirmar Senha:</label> <!-- Rótulo para o campo de confirmação de senha -->
            <input type="password" id="confirm-password" name="confirm_password" required> <!-- Campo de entrada para confirmar a senha -->

            <button type="submit">Registrar</button> <!-- Botão para enviar o formulário -->
        </form>
    </div>

    <script>
        // Adiciona funcionalidade ao botão "Volte para logar"
        document.getElementById('back-to-login').addEventListener('click', function (e) {
            e.preventDefault(); // Impede o comportamento padrão do link
            sessionStorage.clear(); // Limpa o estado de login armazenado no sessionStorage
            window.location.href = '../../login.html'; // Redireciona para a página de login
        });
    </script>
</body>
</html>