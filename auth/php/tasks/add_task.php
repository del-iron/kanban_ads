<?php
ob_start();
require_once '../db_connection.php';

header('Content-Type: application/json');

// Receber e validar JSON
$data = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    error_log("Erro ao decodificar JSON: " . json_last_error_msg());
    echo json_encode(['success' => false, 'message' => 'JSON inválido.']);
    ob_end_flush();
    exit;
}

// Validação básica
$required_fields = ['titulo', 'coluna_id'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        error_log("Campo obrigatório ausente: $field");
        echo json_encode(['success' => false, 'message' => "Campo obrigatório ausente: $field"]);
        ob_end_flush();
        exit;
    }
}

// Extração e sanitização
$titulo = trim($data['titulo']);
$usuario_id = isset($data['usuario_id']) ? (int)$data['usuario_id'] : null;
$usuario_nome = isset($data['usuario_nome']) && trim($data['usuario_nome']) ? trim($data['usuario_nome']) : 'Desconhecido';
$coluna_id = (int)$data['coluna_id'];
$data_inicio = isset($data['data_inicio']) ? $data['data_inicio'] : date('Y-m-d');
$data_final = isset($data['data_final']) ? $data['data_final'] : date('Y-m-d');
$prioridade = isset($data['prioridade']) ? trim($data['prioridade']) : 'Normal';
$progresso = isset($data['progresso']) ? (int)$data['progresso'] : 0;

// Validação de datas
$date_regex = '/^\d{4}-\d{2}-\d{2}$/';
if (!preg_match($date_regex, $data_inicio) || !preg_match($date_regex, $data_final)) {
    echo json_encode(['success' => false, 'message' => 'Datas em formato inválido. Use YYYY-MM-DD.']);
    ob_end_flush();
    exit;
}
if (strtotime($data_final) < strtotime($data_inicio)) {
    echo json_encode(['success' => false, 'message' => 'Data final não pode ser anterior à data de início.']);
    ob_end_flush();
    exit;
}

// Inserção segura
$query = "INSERT INTO tarefas (titulo, usuario_id, usuario_nome, coluna_id, data_inicio, data_final, prioridade, progresso)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($query);

if (!$stmt) {
    error_log("Erro ao preparar statement: " . $conn->error);
    echo json_encode(['success' => false, 'message' => 'Erro ao preparar a consulta.']);
    ob_end_flush();
    exit;
}

$stmt->bind_param("sisisssi", $titulo, $usuario_id, $usuario_nome, $coluna_id, $data_inicio, $data_final, $prioridade, $progresso);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Tarefa adicionada com sucesso.', 'id' => $stmt->insert_id]);
} else {
    error_log("Erro ao executar consulta: " . $stmt->error);
    echo json_encode(['success' => false, 'message' => 'Erro ao adicionar tarefa.', 'error' => $stmt->error]);
}

$stmt->close();
$conn->close();
ob_end_flush();
?>
