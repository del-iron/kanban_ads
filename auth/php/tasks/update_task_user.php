<?php
require_once '../db_connection.php'; // Certifique-se de que o arquivo de conexão está correto

// Recebe os dados enviados pelo frontend
$data = json_decode(file_get_contents('php://input'), true);
$taskId = $data['id'];
$usuarioNome = $data['usuario_nome'] ?? null;

// Validação do nome do usuário
if (empty($usuarioNome)) {
    echo json_encode(['success' => false, 'message' => 'O nome do usuário não pode ser vazio.']);
    exit;
}

// Atualiza o nome do usuário no banco de dados
$query = "UPDATE tarefas SET usuario_nome = ? WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("si", $usuarioNome, $taskId);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Usuário atualizado com sucesso.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao atualizar o usuário.']);
}
?>
