let globalCounter = 1;
const taskButton = document.getElementById('add-task-btn');
const todoList = document.querySelector('.todo-list');
const taskInput = document.getElementById('task-input');
const filterButtons = document.querySelectorAll('.filter-btn');

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
        saveTasks();
        emptyList();
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            createTask();
            saveTasks();
            emptyList();
        }
    });

    todoList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const listItem = event.target.parentElement;
            listItem.remove();
            saveTasks();
            emptyList();
        }
    });

    todoList.addEventListener('change', (event) => {
        if (event.target.classList.contains('task')) {
            const listItem = event.target.parentElement;
            listItem.style.textDecoration = event.target.checked ? 'line-through' : 'none';
        }
        saveTasks();
    });
}

function emptyList() {
    if (todoList.children.length === 0 && !document.querySelector('.empty-message')) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No tasks available.';
        emptyMessage.className = 'empty-message';
        todoList.appendChild(emptyMessage);
        saveTasks();
    }
    else {
        const emptyMessage = document.querySelector('.empty-message');
        emptyMessage?.remove();
        saveTasks();
    }
}

function saveTasks() {
    let tasks = [];
    const listItems = todoList.querySelectorAll('li');
    listItems.forEach((item) => {
        const taskText = item.firstChild.textContent;
        const checked = item.querySelector('input.task').checked;
        tasks.push ({ text: taskText, completed: checked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function restoreTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task.text;

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.className = 'task';
        checkBox.checked = task.completed;
            if (task.completed) {
                listItem.style.textDecoration = 'line-through';
            }
        listItem.appendChild(checkBox);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.className = 'remove-btn';
        listItem.appendChild(removeButton);

        document.querySelector('.todo-list').appendChild(listItem);
    });
}

function applyFilter(filter) {
  const listItems = todoList.querySelectorAll('li');
  listItems.forEach(item => {
    const checkBox = item.querySelector('input.task');
    const taskCompleted = checkBox.checked;

    const isPending = filter === 'Pending' || filter === 'Pendentes';
    const isCompleted = filter === 'Completed' || filter === 'Concluídas';

    if (isPending && taskCompleted) {
      item.style.display = 'none';
    } else if (isCompleted && !taskCompleted) {
      item.style.display = 'none';
    } else {
      item.style.display = '';
    }
  });
}

function filterTasks() {
    filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.textContent.trim();
        applyFilter(filter);
    });
    });
}

function clearButton() {
    const clearBtn = document.getElementById('clear-btn');
    clearBtn.addEventListener('click', () => {
        todoList.innerHTML = '';
        emptyList();
        saveTasks();
    });
}

clearButton();
filterTasks();
addTask();
restoreTasks();
emptyList();
