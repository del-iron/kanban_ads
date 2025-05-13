<?php
// Inicia a sessão para armazenar informações do usuário logado
session_start();

// Define o cabeçalho da resposta como JSON
header('Content-Type: application/json');

// Configurações do banco de dados
$servername = "localhost"; // Nome do servidor
$username = "root"; // Nome de usuário do banco de dados
$password = ""; // Senha do banco de dados
$dbname = "kanban_ads"; // Nome do banco de dados

// Recebe os dados enviados pelo frontend no formato JSON
$data = json_decode(file_get_contents('php://input'), true);

// Extrai os campos de e-mail e senha dos dados recebidos
$email = $data['email'] ?? ''; // E-mail do usuário
$senha = $data['password'] ?? ''; // Senha do usuário

// Verifica se os campos obrigatórios (e-mail e senha) foram preenchidos
if (!empty($email) && !empty($senha)) {
    // Estabelece a conexão com o banco de dados
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verifica se houve erro na conexão com o banco de dados
    if ($conn->connect_error) {
        // Retorna uma mensagem de erro em formato JSON e encerra o script
        echo json_encode(['success' => false, 'message' => 'Erro na conexão com o banco de dados.']);
        exit;
    }

    // Prepara a consulta SQL para buscar o usuário pelo e-mail
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email); // Associa o e-mail ao parâmetro da consulta
    $stmt->execute(); // Executa a consulta
    $resultado = $stmt->get_result(); // Obtém o resultado da consulta

    // Verifica se o e-mail existe no banco de dados
    if ($resultado->num_rows > 0) {
        // Obtém os dados do usuário
        $usuario = $resultado->fetch_assoc();

        // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
        if (password_verify($senha, $usuario['password'])) {
            // Armazena informações do usuário na sessão
            $_SESSION['usuario_id'] = $usuario['id']; // ID do usuário
            $_SESSION['email'] = $usuario['email']; // E-mail do usuário

            // Retorna uma resposta de sucesso com os dados do usuário
            echo json_encode([
                'success' => true,
                'userId' => $usuario['id'], // ID do usuário
                'userName' => $usuario['email'] // Retorna o e-mail como nome do usuário
            ]);
        } else {
            // Retorna uma mensagem de erro caso a senha esteja incorreta
            echo json_encode(['success' => false, 'message' => 'Senha incorreta.']);
        }
    } else {
        // Retorna uma mensagem de erro caso o e-mail não esteja cadastrado
        echo json_encode(['success' => false, 'message' => 'Usuário não cadastrado.']);
    }

    // Fecha o statement para liberar recursos
    $stmt->close();
    // Fecha a conexão com o banco de dados
    $conn->close();
} else {
    // Retorna uma mensagem de erro caso os campos obrigatórios não tenham sido preenchidos
    echo json_encode(['success' => false, 'message' => 'Preencha todos os campos.']);
}
?>
