-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 13/05/2025 às 20:06
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
(1, 'Criar interface de login', 1, 1, '2025-05-09', '2025-05-15', 'Alta', 0),
(2, 'dsadsa', 1, 1, '2025-05-09', '2025-05-28', 'Baixa', 0),
(3, 'dsadsad', 1, 1, '2025-05-09', '2025-05-28', 'Urgente', 6),
(4, 'dsadsad', 1, 1, '2025-05-09', '2025-05-28', 'Baixa', 0),
(5, 'sou lindo', 2, 1, '2025-05-09', '2025-06-04', 'Baixa', 0),
(6, 'testando', NULL, 1, '2025-05-09', NULL, 'Normal', 0),
(7, 's', NULL, 1, '2025-05-09', NULL, 'Normal', 0),
(8, 'd', NULL, 1, '2025-05-09', NULL, 'Normal', 0),
(10, 'testando2', NULL, 1, '2025-05-09', NULL, 'Normal', 0),
(11, 'ds', 22, 1, '2025-05-09', NULL, 'Normal', 0),
(12, 'aa', 22, 1, '2025-05-09', NULL, 'Normal', 0),
(13, 'ds', 22, 1, '2025-05-09', NULL, 'Normal', 0),
(14, 'dsds', 22, 1, '2025-05-09', NULL, 'Normal', 0),
(15, 'cagar', 22, 1, '2025-05-09', NULL, 'Normal', 0),
(16, 'deu merda', 22, 1, '2025-05-09', NULL, 'Normal', 0),
(17, 'tentando', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(18, 'dsd', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(20, 'vshs', 23, 5, '2025-05-12', NULL, 'Normal', 0),
(21, 'ds', 23, 3, '2025-05-12', NULL, 'Normal', 0),
(22, 'Lindo da mae', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(23, '2', 23, 2, '2025-05-12', NULL, 'Normal', 0),
(24, 'ds', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(25, 'ds', 23, 2, '2025-05-12', NULL, 'Normal', 0),
(26, 'dsa', 23, 2, '2025-05-12', NULL, 'Normal', 0),
(27, 'fdsf', 23, 2, '2025-05-12', NULL, 'Normal', 0),
(28, 'dsad', 23, 2, '2025-05-12', NULL, 'Normal', 0),
(29, 'klk', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(30, 'klklk', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(31, 'ta', 23, 4, '2025-05-12', NULL, 'Normal', 0),
(32, 'dsa', 23, 2, '2025-05-12', NULL, 'Normal', 0),
(33, 'sdsd', 23, 2, '2025-05-12', NULL, 'Normal', 0),
(34, 'sou lindo', 23, 4, '2025-05-12', NULL, 'Normal', 0),
(35, 'd', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(36, 'deu certo', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(37, 'rwrew', 23, 3, '2025-05-12', NULL, 'Normal', 0),
(38, 'fdsf', 23, 5, '2025-05-12', NULL, 'Normal', 0),
(39, 'fdsfdsf', 23, 5, '2025-05-12', NULL, 'Normal', 0),
(40, 'fdsfds', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(41, 'fdsf', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(42, 'fdsf', 23, 5, '2025-05-12', NULL, 'Normal', 0),
(43, 'ds', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(44, 'fd', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(45, 'fdsa', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(46, 'sad', 23, 2, '2025-05-12', NULL, 'Normal', 0),
(47, 'lklk', 23, 4, '2025-05-12', NULL, 'Normal', 0),
(48, 'Deu certo', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(49, 'sdas', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(50, 'deu certo', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(51, 'fdsfd', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(52, 'vamos la', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(53, 'vamos', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(54, 'testando', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(55, 'testandoe3', 23, 1, '2025-05-12', NULL, 'Normal', 0),
(57, 'testando', 23, 5, '2025-05-13', NULL, 'Normal', 0),
(58, 'dsad', 23, 2, '2025-05-13', NULL, 'Normal', 0),
(59, 'gfdg', 23, 4, '2025-05-13', NULL, 'Normal', 0),
(60, 'deu certooo', 23, 4, '2025-05-13', NULL, 'Normal', 0),
(61, 'jhj', 23, 5, '2025-05-13', NULL, 'Normal', 0),
(62, 'testando', 23, 4, '2025-05-13', NULL, 'Normal', 0),
(63, 'sa', 23, 1, '2025-05-13', NULL, 'Normal', 0),
(64, 'saSA', 23, 2, '2025-05-13', NULL, 'Normal', 0),
(65, 'dsadsa', 23, 2, '2025-05-13', NULL, 'Normal', 0),
(66, 'vamos testar', 23, 2, '2025-05-13', NULL, 'Normal', 0),
(67, 'testando', 23, 5, '2025-05-13', NULL, 'Normal', 0),
(68, 'fds', 23, 2, '2025-05-13', NULL, 'Normal', 0),
(69, 'sds', 23, 1, '2025-05-13', NULL, 'Normal', 0),
(70, 'fd', 23, 1, '2025-05-13', NULL, 'Normal', 0),
(71, 'dfd', 23, 2, '2025-05-13', NULL, 'Normal', 0),
(72, 'd', 23, 1, '2025-05-13', NULL, 'Normal', 0),
(73, 'sa', 23, 2, '2025-05-13', NULL, 'Normal', 0),
(74, '1', 23, 4, '2025-05-13', NULL, 'Normal', 0),
(75, '2', 23, 2, '2025-05-13', NULL, 'Normal', 0),
(76, '3', 23, 3, '2025-05-13', NULL, 'Normal', 0),
(77, '7', 23, 4, '2025-05-13', NULL, 'Normal', 0),
(78, 'aiai', 23, 5, '2025-05-13', NULL, 'Normal', 0),
(79, 'fd', 23, 5, '2025-05-13', NULL, 'Normal', 0),
(80, 'Eu sou perfeito', 23, 3, '2025-05-13', NULL, 'Normal', 0),
(81, 'dsa', 23, 5, '2025-05-13', NULL, 'Normal', 0),
(82, 'testando de novo', 23, 5, '2025-05-13', NULL, 'Normal', 0),
(83, 'fds', 23, 1, '2025-05-13', NULL, 'Normal', 0),
(84, 's', 23, 5, '2025-05-13', NULL, 'Normal', 0),
(85, 'd', 23, 5, '2025-05-13', NULL, 'Normal', 0),
(86, 'dsad', 23, 1, '2025-05-13', NULL, 'Normal', 0),
(87, 'dsads', 23, 5, '2025-05-13', NULL, 'Normal', 0),
(88, 'dsadsa', 23, 5, '2025-05-13', NULL, 'Normal', 0),
(89, 'TESTANDO', 23, 5, '2025-05-13', NULL, 'Normal', 0),
(90, 'VA', 23, 1, '2025-05-13', NULL, 'Normal', 0),
(91, 'TES', 23, 1, '2025-05-13', NULL, 'Normal', 0),
(92, 'dsds', 23, 2, '2025-05-13', NULL, 'Normal', 0),
(93, 'testando outo', 23, 2, '2025-05-13', NULL, 'Normal', 0),
(94, 'vc é a primeira', 23, 1, '2025-05-13', NULL, 'Normal', 0),
(95, 'vc é a', 23, 1, '2025-05-13', NULL, 'Normal', 0),
(96, 'dsadsadsadsadsads', 23, 2, '2025-05-13', NULL, 'Normal', 0),
(97, 't', 23, 2, '2025-05-13', NULL, 'Normal', 0),
(98, '5', 23, 1, '2025-05-13', NULL, 'Normal', 0),
(99, 'dsad', 23, 2, '2025-05-13', NULL, 'Normal', 0),
(100, 'ok', 24, 5, '2025-05-13', NULL, 'Normal', 0),
(101, 'testando som', 24, 1, '2025-05-13', NULL, 'Normal', 0),
(102, 'ola', 24, 5, '2025-05-13', NULL, 'Normal', 0),
(103, 'dsa', 24, 1, '2025-05-13', NULL, 'Normal', 0),
(104, 'hehehe', 24, 1, '2025-05-13', NULL, 'Normal', 0);

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
(20, 'alexpeidao@esp.ce.gov.br', '$2y$10$/t6ttSMkbhiJqK.rXpu2iu5OIDvLedVtwssOk9PHSQGpiqnzcz.T6'),
(22, 'sou@gmail.com', '$2y$10$n4e56HEDi4RdS.rlpV8W9uYVnYkqTMALHum7LpMLquBGX2390PFwi'),
(23, 'eu_sou_muito_lindo@gmail.com', '$2y$10$YpN/TitUZnyQ5DrQgfp3o.942WTL4iI/4ceTLEW2r/mWMixqmwDBG'),
(24, 'fender.american@gmail.com', '$2y$10$NRO0PVrxI41bE8pqP3QhLOj9omLalwzD.JEtbS9DJCKD9uJl8e/Ei');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
