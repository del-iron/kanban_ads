<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirm_password = trim($_POST['confirm_password']);

    if ($password !== $confirm_password) {
        header('Location: register.php?message=As senhas não coincidem.');
        exit;
    }

    // Conexão com o banco de dados
    $conn = new mysqli('localhost', 'root', '', 'kanban_ads');

    if ($conn->connect_error) {
        header('Location: register.php?message=Erro na conexão com o banco de dados.');
        exit;
    }

    // Gerar o hash da senha
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $conn->prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    $stmt->bind_param('ss', $email, $hashed_password);

    if ($stmt->execute()) {
        header('Location: register.php?message=Usuário registrado com sucesso!');
    } else {
        header('Location: register.php?message=Erro ao registrar usuário.');
    }

    $stmt->close();
    $conn->close();
    exit;
}
?>
