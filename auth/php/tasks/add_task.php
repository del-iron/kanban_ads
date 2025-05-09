<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "kanban_ads");
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Erro de conexão com o banco de dados.']);
    exit;
}

// Receber os dados enviados pelo frontend
$data = json_decode(file_get_contents('php://input'), true);

// Validar os dados recebidos
$titulo = trim($data['titulo'] ?? '');
$usuario_id = $data['usuario_id'] ?? null; // Inclui o usuário, se fornecido
$coluna_id = $data['coluna_id'] ?? null;
$data_inicio = $data['data_inicio'] ?? null;
$data_final = $data['data_final'] ?? null;
$prioridade = $data['prioridade'] ?? 'Normal';
$progresso = $data['progresso'] ?? 0;

if (!empty($titulo) && !empty($coluna_id) && !empty($data_inicio)) {
    $stmt = $conn->prepare("INSERT INTO tarefas (titulo, usuario_id, coluna_id, data_inicio, data_final, prioridade, progresso) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("siisssi", $titulo, $usuario_id, $coluna_id, $data_inicio, $data_final, $prioridade, $progresso);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Tarefa salva com sucesso.', 'id' => $stmt->insert_id]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao salvar a tarefa: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Dados incompletos para salvar a tarefa.']);
}

$conn->close();
?>
