document.addEventListener('DOMContentLoaded', () => {
  initAddTaskButtons();
  initDragAndDrop();
  initTrashBin(); // Inicializa a funcionalidade da lixeira

  // Adiciona funcionalidade ao botão "Tarefa"
  const taskButton = document.querySelector('.btn-task');
  if (taskButton) {
    taskButton.addEventListener('click', () => {
      const backlogColumn = Array.from(document.querySelectorAll('.kanban-column')).find(column => {
        const title = column.querySelector('.column-title span');
        return title && title.textContent.trim() === 'BACKLOG';
      });

      if (backlogColumn) {
        const taskTitle = prompt('Digite o título da nova tarefa:');
        if (taskTitle) {
          createTask(backlogColumn, taskTitle);
        }
      } else {
        alert('A coluna "BACKLOG" não foi encontrada.');
      }
    });
  }
});

// Inicializa os botões de adicionar tarefa
function initAddTaskButtons() {
  const addTaskButtons = document.querySelectorAll('.add-task');
  addTaskButtons.forEach(button => {
    button.addEventListener('click', () => {
      const column = button.closest('.kanban-column');
      const taskTitle = prompt('Digite o título da nova tarefa:'); // Corrigido: taskTitle estava ausente
      if (taskTitle) {
        createTask(column, taskTitle);
        updateProgressBar();
      }
    });
  });
}

// Lista de classes de cores para os cartões
const cardColors = ['green', 'blue', 'orange', 'red', 'purple'];
let colorIndex = 0;

// Cria uma nova tarefa
function createTask(column, title) {
  const taskList = column.querySelector('.task-list');
  const taskCard = document.createElement('div');

  // Define a cor do primeiro cartão como verde
  const isFirstCard = taskList.querySelectorAll('.task-card').length === 0;
  taskCard.className = `task-card ${isFirstCard ? 'green' : cardColors[colorIndex]}`; // Aplica a cor verde ao primeiro cartão
  taskCard.draggable = true;

  // Incrementa o índice da cor e reinicia se atingir o final da lista
  if (!isFirstCard) {
    colorIndex = (colorIndex + 1) % cardColors.length;
  }

  const today = new Date().toISOString().split('T')[0];

  taskCard.innerHTML = `
    <div class="task-content">
      <h3 class="task-title">${title}</h3>
    </div>
    <div class="task-meta">
      <div class="task-assignee">
        <i class="fas fa-user"></i>
      </div>
      <div class="task-status">
        <i class="fas fa-archive status-icon"></i>
        <span>BACKLOG</span>
      </div>
      <div class="task-dates">
        <p><strong>Início:</strong> <span class="start-date">${today}</span></p>
        <p>
          <strong>Final:</strong>
          <input type="date" class="end-date" />
        </p>
      </div>
      <div class="task-progress">
        <label for="progress-bar"><strong>Progresso:</strong></label>
        <input type="range" class="progress-bar" value="0" max="100" />
        <span class="progress-percentage">0%</span>
      </div>
      <div class="task-actions">
        <button class="btn-icon btn-delete"><i class="fas fa-trash"></i></button>
        <button class="btn-icon"><i class="fas fa-comment"></i></button>
        <button class="btn-icon"><i class="fas fa-ellipsis-h"></i></button>
      </div>
    </div>
  `;

  taskList.insertBefore(taskCard, taskList.querySelector('.add-task'));
  initDragEvents(taskCard);
  initTaskProgress(taskCard);
  initDeleteTask(taskCard); // Inicializa a funcionalidade de exclusão
}

// Inicializa a funcionalidade de exclusão de tarefa
function initDeleteTask(taskCard) {
  const deleteButton = taskCard.querySelector('.btn-delete');
  deleteButton.addEventListener('click', () => {
    if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
      taskCard.remove();
      const column = taskCard.closest('.kanban-column');
      if (column) {
        updateTaskCount(column); // Atualiza a contagem de tarefas na coluna
      }
    }
  });
}

// Inicializa a barra de progresso e a data final para uma tarefa
function initTaskProgress(taskCard) {
  const progressBar = taskCard.querySelector('.progress-bar');
  const progressPercentage = taskCard.querySelector('.progress-percentage');

  if (progressBar && progressPercentage) {
    // Atualiza a porcentagem ao alterar o valor da barra
    progressBar.addEventListener('input', () => {
      const progress = progressBar.value;
      progressPercentage.textContent = `${progress}%`;
    });

    // Inicializa o valor da barra e da porcentagem
    progressBar.value = 0;
    progressPercentage.textContent = '0%';
  }
}

// Atualiza a barra de progresso automaticamente ao mover tarefas
function updateTaskProgress(taskCard, columnTitle) {
  const progressBar = taskCard.querySelector('.progress-bar');
  const progressPercentage = taskCard.querySelector('.progress-percentage');

  let progressValue = 0;

  // Define o progresso com base na fase
  if (columnTitle === 'BACKLOG') {
    progressValue = 0;
  } else if (columnTitle === 'A FAZER') {
    progressValue = 25;
  } else if (columnTitle === 'EM PROGRESSO') {
    progressValue = 50;
  } else if (columnTitle === 'EM REVISÃO/TESTE') {
    progressValue = 75;
  } else if (columnTitle === 'CONCLUÍDO') {
    progressValue = 100;
  }

  if (progressBar && progressPercentage) {
    progressBar.value = progressValue; // Atualiza o valor da barra
    progressPercentage.textContent = `${progressValue}%`; // Atualiza o texto da porcentagem
  }
}

// Atualiza a cor do cartão ao mover para a próxima etapa
function updateTaskColor(taskCard, columnIndex) {
  // Remove todas as classes de cor existentes
  cardColors.forEach(color => taskCard.classList.remove(color));
  // Adiciona a nova cor com base no índice da coluna
  const newColor = cardColors[columnIndex % cardColors.length];
  taskCard.classList.add(newColor);
}

// Inicializa o sistema de drag and drop
function initDragAndDrop() {
  const taskCards = document.querySelectorAll('.task-card');
  taskCards.forEach(initDragEvents);
  const taskLists = document.querySelectorAll('.task-list');
  taskLists.forEach(list => {
    list.addEventListener('dragover', handleDragOver);
    list.addEventListener('drop', handleDrop);
  });
}

// Adiciona eventos de drag para uma tarefa
function initDragEvents(taskCard) {
  taskCard.addEventListener('dragstart', handleDragStart);
  taskCard.addEventListener('dragend', handleDragEnd);
}

// Manipuladores de eventos de drag and drop
function handleDragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id || Date.now().toString());
  e.target.classList.add('dragging');
}

function handleDragEnd(e) {
  e.target.classList.remove('dragging');
}

function handleDragOver(e) {
  e.preventDefault();
  const dragging = document.querySelector('.dragging');
  const taskList = e.currentTarget;
  if (dragging && taskList) {
    taskList.appendChild(dragging);
  }
}

function handleDrop(e) {
  e.preventDefault();
  const dragging = document.querySelector('.dragging');
  const column = e.currentTarget.closest('.kanban-column');
  if (dragging && column) {
    e.currentTarget.appendChild(dragging);
    const columnTitle = column.querySelector('.column-title span').textContent.trim();
    const columnIndex = Array.from(document.querySelectorAll('.kanban-column')).indexOf(column);

    // Atualiza o status e a barra de progresso do cartão
    updateTaskStatus(dragging, columnTitle);
    updateTaskProgress(dragging, columnTitle); // Atualiza a barra de progresso
    updateTaskColor(dragging, columnIndex); // Atualiza a cor do cartão
    updateTaskCount(column);
  }
}

function updateTaskStatus(taskCard, columnTitle) {
  const taskStatus = taskCard.querySelector('.task-status span');
  if (taskStatus) {
    taskStatus.textContent = columnTitle; // Atualiza o texto do status com o título da coluna
  }
}

// Atualiza a contagem de tarefas em uma coluna
function updateTaskCount(column) {
  const taskCount = column.querySelectorAll('.task-card').length;
  column.querySelector('.task-count').textContent = taskCount;
}

// Inicializa as datas do projeto
function initProjectDates() {
  const startDateElement = document.getElementById('start-date');
  const today = new Date().toISOString().split('T')[0];
  startDateElement.textContent = today;

  const endDateInput = document.getElementById('end-date');
  endDateInput.addEventListener('change', () => {
    const endDate = endDateInput.value;
    if (new Date(endDate) < new Date(today)) {
      alert('A data final não pode ser anterior à data de início.');
      endDateInput.value = '';
    }
  });
}

// Atualiza a barra de progresso
function updateProgressBar() {
  const totalTasks = document.querySelectorAll('.task-card').length;
  const completedColumn = Array.from(document.querySelectorAll('.kanban-column')).find(column => {
    const title = column.querySelector('.column-title span');
    return title && title.textContent.trim() === 'CONCLUÍDO';
  });

  const completedTasks = completedColumn
    ? completedColumn.querySelectorAll('.task-card').length
    : 0;

  const progressBar = document.getElementById('progress-bar');
  const progressPercentage = document.getElementById('progress-percentage');

  if (totalTasks > 0) {
    const progress = Math.round((completedTasks / totalTasks) * 100);
    progressBar.value = progress;
    progressPercentage.textContent = `${progress}%`;
  } else {
    progressBar.value = 0;
    progressPercentage.textContent = '0%';
  }
}

// Inicializa a funcionalidade da lixeira
function initTrashBin() {
  const trashBin = document.querySelector('.kanban-column.trash-bin'); // Certifique-se de que a coluna "Lixeira" tenha a classe "trash-bin"
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