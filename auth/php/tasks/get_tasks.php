<?php
require_once 'db_connection.php';

// Consulta para buscar tarefas, incluindo o campo usuario_nome
$query = "SELECT id, titulo, usuario_id, usuario_nome, coluna_id, data_inicio, data_final, prioridade, progresso FROM tarefas";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $tasks = [];
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }
    echo json_encode(['success' => true, 'data' => $tasks]);
} else {
    echo json_encode(['success' => false, 'message' => 'Nenhuma tarefa encontrada.']);
}

$conn->close();
?>