document.addEventListener('DOMContentLoaded', () => {
  initAddTaskButtons();
  initDragAndDrop();

  // Adiciona funcionalidade ao botão "Tarefa"
  const taskButton = document.querySelector('.btn-task');
  if (taskButton) {
    taskButton.addEventListener('click', () => {
      // Seleciona a coluna "BACKLOG" com base no texto do título
      const columns = document.querySelectorAll('.kanban-column');
      let backlogColumn = null;

      columns.forEach(column => {
        const title = column.querySelector('.column-title span');
        if (title && title.textContent.trim() === 'BACKLOG') {
          backlogColumn = column;
        }
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
      const taskTitle = prompt('Digite o título da nova tarefa:');
      if (taskTitle) {
        createTask(column, taskTitle);
      }
    });
  });
}

// Cria uma nova tarefa
function createTask(column, title) {
  const taskList = column.querySelector('.task-list');
  const taskCard = document.createElement('div');
  taskCard.className = 'task-card';
  taskCard.draggable = true;
  taskCard.innerHTML = `
    <div class="task-content">
      <h3 class="task-title">${title}</h3>
    </div>
    <div class="task-meta">
      <div class="task-assignee">
        <i class="fas fa-user"></i>
      </div>
      <div class="task-status">
        <i class="fas fa-check-circle status-icon completed"></i>
        <span>CONCLUÍDO</span>
      </div>
      <div class="task-actions">
        <button class="btn-icon"><i class="fas fa-comment"></i></button>
        <button class="btn-icon"><i class="fas fa-ellipsis-h"></i></button>
      </div>
    </div>
  `;
  taskList.insertBefore(taskCard, taskList.querySelector('.add-task'));
  initDragEvents(taskCard);
  updateTaskCount(column);
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
    updateTaskCount(column);
  }
}

// Atualiza a contagem de tarefas em uma coluna
function updateTaskCount(column) {
  const taskCount = column.querySelectorAll('.task-card').length;
  column.querySelector('.task-count').textContent = taskCount;
}