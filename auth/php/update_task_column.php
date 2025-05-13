<?php
// Define o cabeçalho da resposta como JSON
header('Content-Type: application/json');

// Habilita exibição de erros para depuração (remova em produção)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Estabelece a conexão com o banco de dados
$conn = new mysqli("localhost", "root", "", "kanban_ads");

// Verifica se houve erro na conexão com o banco de dados
if ($conn->connect_error) {
    error_log("Erro de conexão: " . $conn->connect_error);
    echo json_encode(['success' => false, 'message' => 'Erro de conexão com o banco de dados: ' . $conn->connect_error]);
    exit;
}

// Recebe os dados enviados pelo frontend no formato JSON
$data = json_decode(file_get_contents('php://input'), true);

// Valida e extrai os dados recebidos
$id = isset($data['id']) ? (int)$data['id'] : null;
$coluna_id = isset($data['coluna_id']) ? (int)$data['coluna_id'] : null;

// Verifica se os dados obrigatórios foram fornecidos
if (!$id || !$coluna_id) {
    error_log("Dados inválidos recebidos no backend: id=$id, coluna_id=$coluna_id");
    echo json_encode(['success' => false, 'message' => 'ID da tarefa ou coluna não fornecido.']);
    exit;
}

// Verifica se a tarefa existe
$stmt = $conn->prepare("SELECT id FROM tarefas WHERE id = ?");
if (!$stmt) {
    error_log("Erro ao preparar consulta SELECT no backend: " . $conn->error);
    echo json_encode(['success' => false, 'message' => 'Erro interno ao verificar a tarefa.']);
    exit;
}
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 0) {
    error_log("Tarefa não encontrada no backend: id=$id");
    echo json_encode(['success' => false, 'message' => 'Tarefa não encontrada.']);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();

// Prepara a consulta SQL para atualizar a coluna
$stmt = $conn->prepare("UPDATE tarefas SET coluna_id = ? WHERE id = ?");
if (!$stmt) {
    error_log("Erro ao preparar consulta UPDATE no backend: " . $conn->error);
    echo json_encode(['success' => false, 'message' => 'Erro interno ao atualizar a coluna.']);
    exit;
}
$stmt->bind_param("ii", $coluna_id, $id);

// Executa a consulta SQL
if ($stmt->execute()) {
    error_log("Coluna atualizada com sucesso no backend: id=$id, nova_coluna_id=$coluna_id");
    echo json_encode(['success' => true, 'message' => 'Coluna atualizada com sucesso.']);
} else {
    error_log("Erro ao executar query UPDATE no backend: " . $stmt->error);
    echo json_encode(['success' => false, 'message' => 'Erro ao atualizar a coluna: ' . $stmt->error]);
}

// Fecha o statement e a conexão
$stmt->close();
$conn->close();
?>