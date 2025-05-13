import { checkAuthentication, displayUserName, logout } from './auth.js';
import { carregarTarefas } from './tasks.js';
import { initDragAndDrop } from './dragAndDrop.js';

// Inicializa o sistema
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    displayUserName();
    logout();
    carregarTarefas();
    initDragAndDrop();
});
