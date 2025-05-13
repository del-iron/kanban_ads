// Redirecionar para a página de login se o usuário não estiver logado
if (sessionStorage.getItem('loggedIn') !== 'true') {
  window.location.href = '../auth/login.html';
}

// Exibir o nome do usuário no canto superior direito
const userName = sessionStorage.getItem('userName');
if (userName) {
  document.getElementById('user-name').textContent = `Bem-vindo, ${userName}`;
}

// Função para deslogar o usuário
document.getElementById('logout-btn').addEventListener('click', function () {
  sessionStorage.clear();
  window.location.href = '../auth/login.html';
});

// Função reutilizável para criar e adicionar um cartão de tarefa ao DOM
function criarCartaoTarefa(tarefa, coluna) {
  // Verifica se o cartão já existe no DOM
  const existingCard = coluna.querySelector(`.task-card[data-task-id="${tarefa.id}"]`);
  if (existingCard) return;

  const taskCard = document.createElement('div');
  taskCard.classList.add('task-card');
  taskCard.setAttribute('draggable', 'true');
  taskCard.setAttribute('data-task-id', tarefa.id);

  // Define a cor do cartão com base na coluna
  const cardColors = ['green', 'blue', 'orange', 'red', 'purple'];
  const colunaId = parseInt(coluna.closest('.kanban-column').getAttribute('data-coluna-id'), 10);
  const colorIndex = (colunaId - 1) % cardColors.length;
  taskCard.classList.add(cardColors[colorIndex]);

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
  coluna.appendChild(taskCard);

  // Inicializa eventos do cartão
  initDragEvents(taskCard);
  initDeleteTask(taskCard);
  initPrioritySelect(taskCard);
  initEndDateInput(taskCard, tarefa.data_inicio);
}

// Função para inicializar o campo de data final
function initEndDateInput(taskCard, dataInicio) {
  const endDateInput = taskCard.querySelector('.end-date');
  if (endDateInput) {
      endDateInput.addEventListener('change', async () => {
          const novaDataFinal = endDateInput.value; // O valor será no formato YYYY-MM-DD
          const taskId = taskCard.getAttribute('data-task-id');

          // Valida a data final
          if (novaDataFinal && novaDataFinal < dataInicio) {
              alert("A data final não pode ser anterior à data de início.");
              endDateInput.value = ''; // Reseta o campo
              return;
          }

          // Atualiza a data final no backend
          try {
              console.log(`Enviando atualização de data final para o backend:`, {
                  id: taskId,
                  data_final: novaDataFinal || null
              }); // Log para depuração

              const response = await fetch('../auth/php/tasks/update_task_date.php', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ id: taskId, data_final: novaDataFinal || null }),
              });

              const result = await response.json();
              console.log("Resposta do backend ao atualizar data final:", result); // Log para depuração

              if (!result.success) {
                  alert("Erro ao atualizar a data final: " + result.message);
              } else {
                  console.log("Data final atualizada com sucesso no banco de dados.");
              }
          } catch (error) {
              console.error("Erro ao atualizar a data final:", error);
              alert("Erro ao atualizar a data final no banco de dados.");
          }
      });
  }
}

// Função para atualizar a data final no backend
async function atualizarDataFinal(taskId, dataFinal) {
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
async function atualizarColunaTarefa(taskId, novoColunaId) {
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

// Função reutilizável para solicitar os dados da tarefa
function solicitarDadosTarefa() {
  const titulo = prompt("Digite o título da tarefa:");
  if (!titulo || titulo.trim().length === 0) {
      alert("O título da tarefa não pode ser vazio.");
      return null;
  }

  const usuarioLogado = sessionStorage.getItem('userName');
  if (!usuarioLogado) {
      alert("Usuário não está logado.");
      return null;
  }

  // Solicita a data final
  let dataFinal = prompt("Digite a data final (YYYY-MM-DD) ou deixe em branco para 'Não definido':");
  if (dataFinal && dataFinal.trim().length > 0) {
      dataFinal = dataFinal.trim();
      // Valida o formato da data
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(dataFinal)) {
          alert("Formato de data inválido. Use YYYY-MM-DD.");
          return null;
      }
      // Valida se a data final não é anterior à data de início
      const hoje = new Date().toISOString().split('T')[0];
      if (dataFinal < hoje) {
          alert("A data final não pode ser anterior à data de início.");
          return null;
      }
  } else {
      dataFinal = null;
  }

  return {
      titulo: titulo.trim(),
      usuarioLogado: usuarioLogado.trim(),
      dataFinal: dataFinal
  };
}

// Função unificada para adicionar uma tarefa
async function adicionarTarefa(colunaId = null) {
  const dadosTarefa = solicitarDadosTarefa();
  if (!dadosTarefa) return;

  // Se a coluna não for especificada, solicita o ID da coluna
  if (!colunaId) {
      colunaId = prompt("Digite o ID da coluna (1: Backlog, 2: A Fazer, 3: Em Progresso, 4: Em Revisão/Teste, 5: Concluído):");
      if (!colunaId || isNaN(colunaId)) {
          alert("ID da coluna inválido.");
          return;
      }
  }

  const usuarioId = sessionStorage.getItem('userId') || null;
  const novaTarefa = {
      titulo: dadosTarefa.titulo,
      usuario_id: usuarioId,
      usuario_nome: dadosTarefa.usuarioLogado,
      coluna_id: parseInt(colunaId, 10),
      data_inicio: new Date().toISOString().split('T')[0],
      data_final: dadosTarefa.dataFinal,
      prioridade: "Normal",
      progresso: 0
  };

  try {
      const response = await fetch('../auth/php/tasks/add_task.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(novaTarefa),
      });

      const result = await response.json();
      if (result.success) {
          const coluna = document.querySelector(`.kanban-column[data-coluna-id="${colunaId}"] .task-list`);
          if (coluna) {
              criarCartaoTarefa({ ...novaTarefa, id: result.id }, coluna);
              atualizarContagemTarefas(colunaId);
          }
      } else {
          alert("Erro ao salvar a tarefa no banco de dados: " + result.message);
      }
  } catch (error) {
      console.error("Erro ao salvar a tarefa:", error);
      alert("Erro ao salvar a tarefa no banco de dados.");
  }
}

// Atualizar contagem de tarefas em cada coluna
function atualizarContagemTarefas(colunaId) {
  const coluna = document.querySelector(`.kanban-column[data-coluna-id="${colunaId}"]`);
  if (coluna) {
      const taskCount = coluna.querySelectorAll('.task-card').length;
      coluna.querySelector('.task-count').textContent = taskCount;
  }
}

// Inicializa eventos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  initAddTaskButtons();
  initDragAndDrop();
  initTrashBin();
  carregarTarefas();
});

// Inicializa os botões de adicionar tarefa
function initAddTaskButtons() {
  // Botão global
  const globalAddTaskButton = document.getElementById('add-task-btn');
  if (globalAddTaskButton) {
      globalAddTaskButton.addEventListener('click', () => {
          adicionarTarefa();
      });
  }

  // Botões de coluna específica
  const addTaskButtons = document.querySelectorAll('.add-task-btn');
  addTaskButtons.forEach(button => {
      button.addEventListener('click', () => {
          const colunaId = button.getAttribute('data-coluna-id');
          adicionarTarefa(colunaId);
      });
  });

  // Botões .add-task (para consistência com o HTML)
  const columnAddTaskLinks = document.querySelectorAll('.add-task');
  columnAddTaskLinks.forEach(link => {
      link.addEventListener('click', () => {
          const column = link.closest('.kanban-column');
          const colunaId = column.getAttribute('data-coluna-id');
          adicionarTarefa(colunaId);
      });
  });
}

// Atualiza a contagem de tarefas e exibe a mensagem "Arraste tarefa aqui" se a coluna estiver vazia
function updateTaskCount(column) {
    const taskList = column.querySelector('.task-list');
    const taskCount = taskList.querySelectorAll('.task-card').length;
    column.querySelector('.task-count').textContent = taskCount;

    // Adiciona ou remove a mensagem "Arraste tarefa aqui"
    let emptyMessage = taskList.querySelector('.empty-message');
    if (taskCount === 0) {
        if (!emptyMessage) {
            emptyMessage = document.createElement('div');
            emptyMessage.classList.add('empty-message');
            emptyMessage.textContent = 'Arraste tarefa aqui';
            taskList.appendChild(emptyMessage);
        }
    } else if (emptyMessage) {
        emptyMessage.remove();
    }
}

// Carrega tarefas do banco de dados
async function carregarTarefas() {
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

// Inicializa o sistema de drag-and-drop com áreas "Arraste aqui"
function initDragAndDrop() {
    const taskCards = document.querySelectorAll('.task-card');
    taskCards.forEach(initDragEvents); // Adiciona eventos de drag para cada cartão

    const taskLists = document.querySelectorAll('.task-list');
    taskLists.forEach(list => {
        // Adiciona a área "Arraste aqui" em cada coluna
        let dropZone = list.querySelector('.drop-zone');
        if (!dropZone) {
            dropZone = document.createElement('div');
            dropZone.classList.add('drop-zone');
            dropZone.textContent = 'Arraste aqui';
            list.appendChild(dropZone);
        }

        // Eventos de drag-and-drop para a área "Arraste aqui"
        dropZone.addEventListener('dragover', handleDragOver); // Permite o drop
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over')); // Remove o estilo ao sair
        dropZone.addEventListener('drop', handleDrop); // Lida com o drop
    });
}

// Adiciona eventos de drag para um cartão
function initDragEvents(taskCard) {
    taskCard.addEventListener('dragstart', handleDragStart); // Início do drag
    taskCard.addEventListener('dragend', handleDragEnd); // Fim do drag
}

// Manipulador para o início do drag
function handleDragStart(e) {
    const taskId = e.target.getAttribute('data-task-id');
    if (!taskId) {
        console.error('Erro: O cartão não possui um atributo data-task-id.');
        return;
    }
    e.dataTransfer.setData('text/plain', taskId); // Define o ID da tarefa
    e.target.classList.add('dragging'); // Adiciona uma classe para estilo
}

// Manipulador para o fim do drag
function handleDragEnd(e) {
    e.target.classList.remove('dragging'); // Remove a classe de estilo
}

// Manipulador para permitir o drop
function handleDragOver(e) {
    e.preventDefault(); // Permite o drop
    const dropZone = e.currentTarget;
    dropZone.classList.add('drag-over'); // Adiciona um estilo visual ao passar o mouse
}

// Atualiza a cor do cartão com base no ID da coluna
function updateTaskColor(taskCard, columnId) {
    const cardColors = ['green', 'blue', 'orange', 'red', 'purple'];
    cardColors.forEach(color => taskCard.classList.remove(color)); // Remove todas as cores existentes
    const colorIndex = (columnId - 1) % cardColors.length; // Calcula o índice da cor com base no ID da coluna
    taskCard.classList.add(cardColors[colorIndex]); // Adiciona a nova cor
}

// Manipulador para o drop
function handleDrop(e) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain'); // Obtém o ID da tarefa
    const column = e.currentTarget.closest('.kanban-column'); // Obtém a coluna de destino

    if (!taskId || !column) {
        console.error('Erro: ID da tarefa ou coluna de destino não encontrado.');
        return;
    }

    const taskCard = document.querySelector(`.task-card[data-task-id="${taskId}"]`);
    const columnId = parseInt(column.getAttribute('data-coluna-id'), 10);

    if (taskCard && columnId) {
        const taskList = column.querySelector('.task-list');
        taskList.appendChild(taskCard); // Move o cartão para a nova coluna
        updateTaskColumn(taskId, columnId).then(() => {
            taskCard.classList.add('moved'); // Adiciona uma classe para indicar sucesso
            setTimeout(() => taskCard.classList.remove('moved'), 2000); // Remove a classe após 2 segundos
        }).catch(error => {
            console.error('Erro ao atualizar a coluna no backend:', error);
            alert('Erro ao atualizar a coluna da tarefa no servidor.');
        });

        updateTaskStatus(taskCard, column.querySelector('.column-title span').textContent.trim());
        updateTaskColor(taskCard, columnId); // Atualiza a cor do cartão com base na nova coluna
        updateTaskCount(column); // Atualiza a contagem de tarefas
    } else {
        console.error('Erro: Não foi possível mover o cartão ou identificar a coluna.');
    }

    e.currentTarget.classList.remove('drag-over'); // Remove o estilo visual
}

// Atualiza a coluna da tarefa no backend
async function updateTaskColumn(taskId, columnId) {
    console.log(`Atualizando coluna da tarefa ID: ${taskId} para coluna ID: ${columnId}`); // Log para depuração
    try {
        const response = await fetch('../auth/php/update_task_column.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: taskId, coluna_id: columnId })
        });

        const result = await response.json();
        if (result.success) {
            console.log('Coluna atualizada com sucesso:', result.message); // Log de sucesso
        } else {
            console.error('Erro ao atualizar a coluna:', result.message); // Log de erro
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Erro ao conectar ao backend:', error); // Log de erro de conexão
        throw error;
    }
}

// Atualiza o status da tarefa
function updateTaskStatus(taskCard, columnTitle) {
    const taskStatus = taskCard.querySelector('.task-status span');
    if (taskStatus) {
        taskStatus.textContent = columnTitle;
    }
}

// Atualiza a cor do cartão
function updateTaskColor(taskCard, columnIndex) {
    const cardColors = ['green', 'blue', 'orange', 'red', 'purple'];
    cardColors.forEach(color => taskCard.classList.remove(color)); // Remove todas as cores existentes
    taskCard.classList.add(cardColors[columnIndex % cardColors.length]); // Adiciona a nova cor com base no índice da coluna
}

// Atualiza a contagem de tarefas
function updateTaskCount(column) {
    const taskList = column.querySelector('.task-list');
    const taskCount = taskList.querySelectorAll('.task-card').length;
    column.querySelector('.task-count').textContent = taskCount;

    // Adiciona ou remove a mensagem "Arraste tarefa aqui"
    let emptyMessage = taskList.querySelector('.empty-message');
    if (taskCount === 0) {
        if (!emptyMessage) {
            emptyMessage = document.createElement('div');
            emptyMessage.classList.add('empty-message');
            emptyMessage.textContent = 'Arraste tarefa aqui';
            taskList.appendChild(emptyMessage);
        }
    } else if (emptyMessage) {
        emptyMessage.remove();
    }
}

// Inicializa a funcionalidade de exclusão
function initDeleteTask(taskCard) {
    const deleteButton = taskCard.querySelector('.btn-delete');
    deleteButton.addEventListener('click', () => {
        if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
            const column = taskCard.closest('.kanban-column');
            taskCard.remove();
            if (column) {
                updateTaskCount(column); // Atualiza a contagem de tarefas na coluna
            }
        }
    });
}

// Inicializa a seleção de prioridade
function initPrioritySelect(taskCard) {
    const prioritySelect = taskCard.querySelector('.priority-select');
    if (prioritySelect) {
        prioritySelect.addEventListener('change', () => {
            const priority = prioritySelect.value;
            taskCard.setAttribute('data-priority', priority); // Define a prioridade como atributo
        });
    }
}

// Inicializa a funcionalidade da lixeira
function initTrashBin() {
    const trashBin = document.querySelector('.kanban-column.trash-bin');
    if (trashBin) {
        const taskList = trashBin.querySelector('.task-list');
        taskList.addEventListener('dragover', (e) => {
            e.preventDefault();
            taskList.classList.add('drag-over'); // Adiciona um estilo visual ao passar o mouse
        });

        taskList.addEventListener('dragleave', () => {
            taskList.classList.remove('drag-over'); // Remove o estilo visual
        });

        taskList.addEventListener('drop', (e) => {
            e.preventDefault();
            const dragging = document.querySelector('.dragging');
            if (dragging) {
                if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
                    dragging.remove(); // Remove o cartão
                    const column = dragging.closest('.kanban-column');
                    if (column) {
                        updateTaskCount(column); // Atualiza a contagem de tarefas na coluna original
                    }
                }
                taskList.classList.remove('drag-over'); // Remove o estilo visual
            }
        });
    }
}