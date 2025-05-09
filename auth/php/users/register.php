<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrar</title>
    <link rel="stylesheet" href="register.css">
</head>
<body>
    <div class="top-bar">
        <a href="#" id="back-to-login" class="back-to-login">Volte para logar</a>
    </div>
    <div class="register-container">
        <h1>Criar conta</h1>
        <?php if (isset($_GET['message'])): ?>
            <p class="feedback"><?php echo htmlspecialchars($_GET['message']); ?></p>
        <?php endif; ?>
        <form action="process_register.php" method="POST">
            <label for="email">E-mail:</label>
            <input type="email" id="email" name="email" required>
            
            <label for="password">Senha:</label>
            <input type="password" id="password" name="password" required>
            
            <label for="confirm-password">Confirmar Senha:</label>
            <input type="password" id="confirm-password" name="confirm_password" required>
            
            <button type="submit">Registrar</button>
        </form>
    </div>
    <script>
        // Limpar o estado de login e redirecionar para a página de login
        document.getElementById('back-to-login').addEventListener('click', function (e) {
            e.preventDefault();
            sessionStorage.clear(); // Limpar o estado de login
            window.location.href = '../../login.html'; // Redirecionar para a página de login
        });
    </script>
</body>
</html>
