// Inicializa o sistema de drag-and-drop
export function initDragAndDrop() {
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

// Manipulador para o início do drag
export function handleDragStart(e) {
    const taskId = e.target.getAttribute('data-task-id');
    if (!taskId) {
        console.error('Erro: O cartão não possui um atributo data-task-id.');
        return;
    }
    e.dataTransfer.setData('text/plain', taskId); // Define o ID da tarefa
    e.target.classList.add('dragging'); // Adiciona uma classe para estilo
}

// Manipulador para o fim do drag
export function handleDragEnd(e) {
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
export function handleDrop(e) {
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