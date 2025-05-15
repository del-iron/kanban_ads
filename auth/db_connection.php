<?php
// Configurações
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "kanban_ads";

// Verifica se extensão mysqli está habilitada
if (!function_exists('mysqli_connect')) {
    error_log("A extensão mysqli não está habilitada no PHP.");
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Erro no servidor: extensão mysqli ausente.']);
    exit;
}

// Cria conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica conexão
if ($conn->connect_error) {
    error_log("Erro na conexão com o banco de dados: " . $conn->connect_error);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Erro na conexão com o banco de dados.']);
    exit;
}

// Log opcional — remova em produção
// error_log("Conexão com o banco de dados estabelecida com sucesso.");
?>
