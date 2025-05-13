<?php
// Define o cabeçalho da resposta como JSON
header('Content-Type: application/json');

// Estabelece a conexão com o banco de dados
$conn = new mysqli("localhost", "root", "", "kanban_ads");

// Verifica se houve erro na conexão com o banco de dados
if ($conn->connect_error) {
    // Retorna uma mensagem de erro em formato JSON e encerra o script
    echo json_encode(['success' => false, 'message' => 'Erro de conexão com o banco de dados.']);
    exit;
}

// Recebe os dados enviados pelo frontend no formato JSON
$data = json_decode(file_get_contents('php://input'), true);

// Valida e extrai os dados recebidos
$titulo = trim($data['titulo'] ?? ''); // Título da tarefa (obrigatório)
$usuario_id = $data['usuario_id'] ?? null; // ID do usuário associado à tarefa (opcional)
$coluna_id = $data['coluna_id'] ?? null; // ID da coluna onde a tarefa será adicionada (obrigatório)
$data_inicio = $data['data_inicio'] ?? null; // Data de início da tarefa (obrigatório)
$data_final = $data['data_final'] ?? null; // Data final da tarefa (opcional)
$prioridade = $data['prioridade'] ?? 'Normal'; // Prioridade da tarefa (valor padrão: "Normal")
$progresso = $data['progresso'] ?? 0; // Progresso da tarefa (valor padrão: 0)

// Verifica se os dados obrigatórios foram fornecidos
if (!empty($titulo) && !empty($coluna_id) && !empty($data_inicio)) {
    // Prepara a consulta SQL para inserir a nova tarefa no banco de dados
    $stmt = $conn->prepare("INSERT INTO tarefas (titulo, usuario_id, coluna_id, data_inicio, data_final, prioridade, progresso) VALUES (?, ?, ?, ?, ?, ?, ?)");
    // Associa os valores recebidos aos parâmetros da consulta
    $stmt->bind_param("siisssi", $titulo, $usuario_id, $coluna_id, $data_inicio, $data_final, $prioridade, $progresso);

    // Executa a consulta SQL
    if ($stmt->execute()) {
        // Retorna uma mensagem de sucesso com o ID da tarefa recém-criada
        echo json_encode(['success' => true, 'message' => 'Tarefa salva com sucesso.', 'id' => $stmt->insert_id]);
    } else {
        // Retorna uma mensagem de erro caso a execução da consulta falhe
        echo json_encode(['success' => false, 'message' => 'Erro ao salvar a tarefa: ' . $stmt->error]);
    }

    // Fecha o statement para liberar recursos
    $stmt->close();
} else {
    // Retorna uma mensagem de erro caso os dados obrigatórios estejam ausentes
    echo json_encode(['success' => false, 'message' => 'Dados incompletos para salvar a tarefa.']);
}

// Fecha a conexão com o banco de dados
$conn->close();
?>
