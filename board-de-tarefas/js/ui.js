// Atualiza a contagem de tarefas e exibe a mensagem "Arraste tarefa aqui"
export function updateTaskCount(column) {
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

// Atualiza a cor do cartão com base no ID da coluna
export function updateTaskColor(taskCard, columnId) {
    const cardColors = ['green', 'blue', 'orange', 'red', 'purple'];
    cardColors.forEach(color => taskCard.classList.remove(color)); // Remove todas as cores existentes
    const colorIndex = (columnId - 1) % cardColors.length; // Calcula o índice da cor com base no ID da coluna
    taskCard.classList.add(cardColors[colorIndex]); // Adiciona a nova cor
}