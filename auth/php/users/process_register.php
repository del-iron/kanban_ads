<?php
// Verifica se o método da requisição é POST (envio de formulário)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtém os valores enviados pelo formulário e remove espaços extras
    $email = trim($_POST['email']); // E-mail do usuário
    $password = trim($_POST['password']); // Senha do usuário
    $confirm_password = trim($_POST['confirm_password']); // Confirmação da senha

    // Verifica se as senhas coincidem
    if ($password !== $confirm_password) {
        // Redireciona de volta para a página de registro com uma mensagem de erro
        header('Location: register.php?message=As senhas não coincidem.');
        exit;
    }

    // Conexão com o banco de dados
    $conn = new mysqli('localhost', 'root', '', 'kanban_ads');

    // Verifica se houve erro na conexão com o banco de dados
    if ($conn->connect_error) {
        // Redireciona de volta para a página de registro com uma mensagem de erro
        header('Location: register.php?message=Erro na conexão com o banco de dados.');
        exit;
    }

    // Gera o hash da senha para armazená-la de forma segura no banco de dados
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Prepara a consulta SQL para inserir o novo usuário no banco de dados
    $stmt = $conn->prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    $stmt->bind_param('ss', $email, $hashed_password); // Associa os valores do e-mail e da senha ao statement

    // Executa a consulta SQL
    if ($stmt->execute()) {
        // Redireciona para a página de registro com uma mensagem de sucesso
        header('Location: register.php?message=Usuário registrado com sucesso!');
    } else {
        // Redireciona para a página de registro com uma mensagem de erro
        header('Location: register.php?message=Erro ao registrar usuário.');
    }

    // Fecha o statement para liberar recursos
    $stmt->close();
    // Fecha a conexão com o banco de dados
    $conn->close();
    exit;
}
?>
