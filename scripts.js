let globalCounter = 1;
const taskButton = document.getElementById('add-task-btn');
const todoList = document.querySelector('.todo-list');
const taskInput = document.getElementById('task-input');

function createTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;
            listItem.id = `task-item-${globalCounter}`;
            todoList.appendChild(listItem);

            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.className = 'task';
            checkBox.id = `task-${globalCounter}`;
            listItem.appendChild(checkBox);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'X';
            removeButton.className = 'remove-btn';
            removeButton.id = `remove-btn-${globalCounter}`;
            listItem.appendChild(removeButton);
            
            taskInput.value = '';
            globalCounter++;
        }
}

function addTask() {
    taskButton.addEventListener('click', (event) => {
        createTask();
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            createTask();
        }
    });

    todoList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const listItem = event.target.parentElement;
            listItem.remove();
        }
    });

    todoList.addEventListener('change', (event) => {
        if (event.target.classList.contains('task')) {
            const listItem = event.target.parentElement;
            listItem.style.textDecoration = event.target.checked ? 'line-through' : 'none';
        }
    });
}

addTask();
createTask();
