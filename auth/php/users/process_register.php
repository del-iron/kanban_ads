<?php
require_once '../../db_connection.php'; // Caminho corrigido para o arquivo de conexão

// Recebe os dados do formulário
$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;
$confirmPassword = $_POST['confirm_password'] ?? null;

// Valida os campos obrigatórios
if (empty($email) || empty($password) || empty($confirmPassword)) {
    header("Location: register.php?message=" . urlencode("Todos os campos são obrigatórios."));
    exit;
}

// Verifica se as senhas coincidem
if ($password !== $confirmPassword) {
    header("Location: register.php?message=" . urlencode("As senhas não coincidem."));
    exit;
}

// Verifica se o e-mail já está cadastrado
$query = "SELECT id FROM users WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    // Feedback claro para o usuário
    header("Location: register.php?message=" . urlencode("Usuário já cadastrado. Tente outro e-mail."));
    $stmt->close();
    $conn->close();
    exit;
}

// Insere o novo usuário no banco de dados
$query = "INSERT INTO users (email, password) VALUES (?, ?)";
$stmt = $conn->prepare($query);
$hashedPassword = password_hash($password, PASSWORD_BCRYPT); // Criptografa a senha
$stmt->bind_param("ss", $email, $hashedPassword);

if ($stmt->execute()) {
    header("Location: ../../login.html?message=" . urlencode("Cadastro realizado com sucesso. Faça login."));
} else {
    header("Location: register.php?message=" . urlencode("Erro ao registrar. Tente novamente."));
}

$stmt->close();
$conn->close();
?>
