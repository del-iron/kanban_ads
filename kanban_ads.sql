-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 09/05/2025 às 15:18
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `kanban_ads`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `colunas`
--

CREATE TABLE `colunas` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `colunas`
--

INSERT INTO `colunas` (`id`, `nome`) VALUES
(1, 'Backlog'),
(2, 'A fazer'),
(3, 'Em progresso'),
(4, 'Em revisão/teste'),
(5, 'Concluído');

-- --------------------------------------------------------

--
-- Estrutura para tabela `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `tarefa_id` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `data_comentario` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tarefas`
--

CREATE TABLE `tarefas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `coluna_id` int(11) NOT NULL,
  `data_inicio` date NOT NULL DEFAULT curdate(),
  `data_final` date DEFAULT NULL,
  `prioridade` enum('Baixa','Normal','Alta','Urgente') DEFAULT 'Normal',
  `progresso` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tarefas`
--

INSERT INTO `tarefas` (`id`, `titulo`, `usuario_id`, `coluna_id`, `data_inicio`, `data_final`, `prioridade`, `progresso`) VALUES
(1, 'Criar interface de login', 1, 1, '2025-05-09', '2025-05-15', 'Alta', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'jardel.rocha@esp.ce.gov.br', '$2y$10$bVA7gtJ2FLO/9Pzj9wcDQ.pZmYvLY7x7BB/25cvl.qFgTxQZapgH.'),
(2, 'delsistemasandroid@gmail.com', '$2y$10$zVSCX1X9IWy.8dpVTeuQTO5z5.PMkx2qQHAucrkzVZ18bB6N87AD.'),
(4, 'eu@eusou.com', '$2y$10$2ds6ypWYGvmNTKif1nmve.vEots2FOJ0VFobmP2rAFkmswW28Gehq'),
(5, 'quero@quero.com', '$2y$10$HRcsbAmDdVUmzqUl.e2Ld.TJr2CWXiDII1dbTmdx3Q8V2KqPJIf/.'),
(7, 'er@quero.com', '$2y$10$5jHSNXIAV./nOfQcsJnQIe.MyQ.XzrU.8vPgsWFjVtjYGtXxnQU9O'),
(8, 'oi@gmail.com', '$2y$10$LFvkdsvSlMoR8TBB0A1S0OOK0naQmxWXV76k1PlwsH81k3y6Gb55.'),
(10, 'olaa@gmail.com', '$2y$10$P3EOn9mwhKma.vc5uNdB5eVOnDnYAhWzy1/VNoZHoUMpcoOFLK7I2'),
(11, 'caguei@gmail.com', '$2y$10$Ucbge7RKMh1qOMU02DXkGOCIjAJu2hp5lEVAXRksqW7BcNqAdzv9a'),
(12, 'cesar_botafoguense@gmail.com', '$2y$10$ndR9vWqy4p421R.Q3eIPlutYO47qvK45fieP58o6tziR/w7vuOJXK'),
(13, 'alex@esp.com', '$2y$10$sO4d2phmjhe1Ng7fpfGv2uGrV3V/7NLc/sP2j8k0/umrWBxSfrzdW'),
(14, 'del_lindo_da_esp@gmail.com', '$2y$10$mlsduBjm8/7XUm3gkgotruaUKg/Pz2Gf3IixvCpOo41ycjdn4SL5O'),
(15, 'kjfkjskajf@gma.com', '$2y$10$bUILB6Gk.XDl5BAGiCytJuxu5NGtrYF.62E.uY1AJz/eKcc4kY.0W'),
(16, '123@gmail.com', '$2y$10$ekxt3fZLL.4DdM3p8o6DDuvMuar7XaMHX9o0oy5sWCKuKjTzAK/ma'),
(17, '88888888@gmail.com', '$2y$10$sjaevDcab9KAHo6oL9i2G.hysSP0Jn0CqCgByBmysj3eKhP1yDk0K'),
(18, '1232@gmail.com', '$2y$10$hcivw45iKsuoeWZtQOVEmurqGdsTwWF1MB5NORsT3yQajo7uSqeWu'),
(19, '12356654@gmail.com', '$2y$10$DPVUJNCFPabyYboeOAdY5e1awyswqOqSX24aE4CGsclzdQ9DBhdxe'),
(20, 'alexpeidao@esp.ce.gov.br', '$2y$10$/t6ttSMkbhiJqK.rXpu2iu5OIDvLedVtwssOk9PHSQGpiqnzcz.T6');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `colunas`
--
ALTER TABLE `colunas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tarefa_id` (`tarefa_id`);

--
-- Índices de tabela `tarefas`
--
ALTER TABLE `tarefas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `coluna_id` (`coluna_id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `colunas`
--
ALTER TABLE `colunas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tarefas`
--
ALTER TABLE `tarefas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`tarefa_id`) REFERENCES `tarefas` (`id`);

--
-- Restrições para tabelas `tarefas`
--
ALTER TABLE `tarefas`
  ADD CONSTRAINT `tarefas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tarefas_ibfk_2` FOREIGN KEY (`coluna_id`) REFERENCES `colunas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
