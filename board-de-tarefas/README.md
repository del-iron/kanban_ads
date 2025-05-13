# Gerenciador de Tarefas - Kavod

**Kavod** é uma palavra de origem hebraica que significa "honra" ou "glória". Este sistema foi desenvolvido para ajudar na organização e gerenciamento de tarefas, promovendo eficiência e produtividade com um design intuitivo e funcionalidades interativas.

## Funcionalidades

- **Adicionar Tarefas**: Permite criar novas tarefas em qualquer coluna do Kanban.
- **Evitar Duplicação de Cards**: Correções implementadas para garantir que apenas um card seja criado ao adicionar uma nova tarefa.
- **Drag and Drop**: Arraste e solte tarefas entre colunas para alterar seu status.
- **Contagem de Tarefas**: Atualização automática do número de tarefas em cada coluna.
- **Interface Responsiva**: Layout adaptável para diferentes tamanhos de tela.
- **Navegação Intuitiva**: Barra lateral com atalhos para projetos e tarefas recentes.

## Estrutura do Projeto

- **index.html**: Página principal com a estrutura do board.
- **css/style.css**: Estilos da página, incluindo responsividade e design do Kanban.
- **js/script.js**: Scripts JavaScript para funcionalidades interativas, como drag and drop e adição de tarefas.
- **assets/icons/**: Ícones personalizados (se necessário).
- **assets/images/**: Imagens gerais (exemplo: avatar de usuário).
- **auth/php/tasks/**:
  - `add_task.php`: Script para adicionar tarefas ao banco de dados.
  - `get_tasks.php`: Script para carregar tarefas do banco de dados.

## Como usar

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/board-de-tarefas.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd board-de-tarefas
   ```
3. Configure o banco de dados:
   - Importe o arquivo SQL fornecido para criar a tabela `tarefas`.
4. Abra o arquivo `index.html` em um navegador:
   - No navegador, acesse: `http://localhost/kanban_ads/board-de-tarefas/` (se estiver usando XAMPP ou outro servidor local).
5. Personalize conforme necessário.

## Tecnologias Utilizadas

- **HTML5**: Estrutura da página.
- **CSS3**: Estilização e layout responsivo.
- **JavaScript**: Funcionalidades interativas, como drag and drop e adição de tarefas.
- **PHP**: Backend para manipulação de tarefas no banco de dados.
- **MySQL**: Banco de dados para armazenar tarefas.
- **Font Awesome**: Ícones para navegação e tarefas.

## Licença

Este projeto está sob a licença MIT.
