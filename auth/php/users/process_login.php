<?php
session_start();

header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kanban_ads";

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$senha = $data['password'] ?? '';

if (!empty($email) && !empty($senha)) {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Erro na conexão com o banco de dados.']);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $usuario = $resultado->fetch_assoc();

        if (password_verify($senha, $usuario['password'])) {
            $_SESSION['usuario_id'] = $usuario['id'];
            $_SESSION['email'] = $usuario['email'];
            echo json_encode([
                'success' => true,
                'userId' => $usuario['id'],
                'userName' => $usuario['email'] // Retorna o e-mail como nome do usuário
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Senha incorreta.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuário não cadastrado.']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Preencha todos os campos.']);
}
?>
