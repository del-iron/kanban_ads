<?php
require_once '../db_connection.php'; // Certifique-se de que o arquivo de conexão está correto

// Recebe os dados enviados pelo frontend
$data = json_decode(file_get_contents('php://input'), true);
$taskId = $data['id'] ?? null;
$dataFinal = $data['data_final'] ?? null;

// Validação dos dados recebidos
if (empty($taskId)) {
    echo json_encode(['success' => false, 'message' => 'ID da tarefa não fornecido.']);
    exit;
}

if (!empty($dataFinal) && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $dataFinal)) {
    echo json_encode(['success' => false, 'message' => 'Formato de data inválido. Use o formato YYYY-MM-DD.']);
    exit;
}

// Log para depuração
error_log("Recebido para atualização: ID=$taskId, data_final=$dataFinal");

// Atualiza a data final no banco de dados
$query = "UPDATE tarefas SET data_final = ? WHERE id = ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    error_log("Erro ao preparar a consulta: " . $conn->error);
    echo json_encode(['success' => false, 'message' => 'Erro ao preparar a consulta no banco de dados.']);
    exit;
}

$stmt->bind_param("si", $dataFinal, $taskId);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Data final atualizada com sucesso.']);
} else {
    // Log de erro no banco de dados
    error_log("Erro ao executar a consulta: " . $stmt->error);
    echo json_encode(['success' => false, 'message' => 'Erro ao atualizar a data final no banco de dados.']);
}

$stmt->close();
$conn->close();
?>