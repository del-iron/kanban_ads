// Função para criar e adicionar um cartão de tarefa ao DOM
// Responsável por criar o elemento HTML de uma tarefa e adicioná-lo à coluna correspondente
export function criarCartaoTarefa(tarefa, coluna) {
  // Verifica se o cartão já existe no DOM para evitar duplicação
  const existingCard = coluna.querySelector(`.task-card[data-task-id="${tarefa.id}"]`);
  if (existingCard) return;

  // Cria o elemento do cartão de tarefa
  const taskCard = document.createElement('div');
  taskCard.classList.add('task-card');
  taskCard.setAttribute('draggable', 'true'); // Permite arrastar o cartão
  taskCard.setAttribute('data-task-id', tarefa.id); // Define o ID da tarefa como atributo

  // Define a cor do cartão com base no ID da coluna
  const cardColors = ['green', 'blue', 'orange', 'red', 'purple'];
  const colunaId = parseInt(coluna.closest('.kanban-column').getAttribute('data-coluna-id'), 10);
  const colorIndex = (colunaId - 1) % cardColors.length;
  taskCard.classList.add(cardColors[colorIndex]);

  // Define o conteúdo HTML do cartão
  taskCard.innerHTML = `
      <div class="task-content">
          <h3 class="task-title">${tarefa.titulo}</h3>
      </div>
      <div class="task-meta">
          <div class="task-status">
              <i class="fas fa-spinner status-icon in-progress"></i>
              <span>${tarefa.prioridade || 'Normal'}</span>
          </div>
          <div class="task-dates">
              <small><strong>Início:</strong> ${tarefa.data_inicio || 'Não definido'}</small>
              <div class="date-final-container">
                  <label for="end-date-${tarefa.id}"><small><strong>Final:</strong></small></label>
                  <input type="date" id="end-date-${tarefa.id}" class="end-date" value="${tarefa.data_final || ''}">
              </div>
          </div>
          <div class="task-user">
              <small><strong>Usuário:</strong> ${tarefa.usuario_nome || 'Desconhecido'}</small>
          </div>
          <div class="task-priority">
              <label for="priority-select"><strong>Prioridade:</strong></label>
              <select class="priority-select">
                  <option value="urgente" ${tarefa.prioridade === 'Urgente' ? 'selected' : ''}>Urgente</option>
                  <option value="alta" ${tarefa.prioridade === 'Alta' ? 'selected' : ''}>Alta</option>
                  <option value="normal" ${tarefa.prioridade === 'Normal' ? 'selected' : ''}>Normal</option>
                  <option value="baixa" ${tarefa.prioridade === 'Baixa' ? 'selected' : ''}>Baixa</option>
              </select>
          </div>
          <div class="task-actions">
              <button class="btn-icon btn-delete"><i class="fas fa-trash"></i></button>
              <button class="btn-icon"><i class="fas fa-comment"></i></button>
              <button class="btn-icon"><i class="fas fa-ellipsis-h"></i></button>
          </div>
      </div>
  `;

  // Adiciona o cartão à coluna
  coluna.appendChild(taskCard);

  // Inicializa eventos do cartão (drag-and-drop, exclusão, prioridade, etc.)
  initDragEvents(taskCard);
  initDeleteTask(taskCard); // Mantém a funcionalidade de exclusão no card
  initPrioritySelect(taskCard);
  initEndDateInput(taskCard, tarefa.data_inicio);
}

// Função para atualizar a data final no backend
// Envia uma requisição ao backend para atualizar a data final de uma tarefa
export async function atualizarDataFinal(taskId, dataFinal) {
  try {
      const response = await fetch('../auth/php/tasks/update_task_date.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: taskId, data_final: dataFinal || null }),
      });

      const result = await response.json();
      if (!result.success) {
          alert("Erro ao atualizar a data final: " + result.message);
      }
  } catch (error) {
      console.error("Erro ao atualizar a data final:", error);
      alert("Erro ao atualizar a data final no banco de dados.");
  }
}

// Função para atualizar a coluna da tarefa no backend
// Envia uma requisição ao backend para atualizar a coluna de uma tarefa
export async function atualizarColunaTarefa(taskId, novoColunaId) {
  try {
      const response = await fetch('../auth/php/tasks/update_task_column.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: taskId, coluna_id: novoColunaId }),
      });

      const result = await response.json();
      if (!result.success) {
          alert("Erro ao atualizar a coluna da tarefa: " + result.message);
          return false;
      }
      return true;
  } catch (error) {
      console.error("Erro ao atualizar a coluna da tarefa:", error);
      alert("Erro ao atualizar a coluna no banco de dados.");
      return false;
  }
}

// Função para carregar tarefas do banco de dados
// Busca as tarefas do backend e as adiciona às colunas correspondentes
export async function carregarTarefas() {
  try {
      const response = await fetch('../auth/php/tasks/get_tasks.php');
      const tarefas = await response.json();
      if (tarefas.success) {
          tarefas.data.forEach(tarefa => {
              if (tarefa.titulo && tarefa.coluna_id) {
                  const coluna = document.querySelector(`.kanban-column[data-coluna-id="${tarefa.coluna_id}"] .task-list`);
                  if (coluna) {
                      criarCartaoTarefa(tarefa, coluna);
                  }
              }
          });

          // Atualiza a contagem de tarefas para todas as colunas
          document.querySelectorAll('.kanban-column').forEach(column => {
              updateTaskCount(column); // Atualiza a contagem e exibe a mensagem "Arraste tarefa aqui" se necessário
          });
      } else {
          console.error('Erro ao carregar tarefas:', tarefas.message);
      }
  } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
  }
}

// Função para inicializar a funcionalidade de exclusão no card
function initDeleteTask(taskCard) {
  const deleteButton = taskCard.querySelector('.btn-delete');
  deleteButton.addEventListener('click', () => {
      if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
          taskCard.remove(); // Remove o cartão diretamente
      }
  });
}