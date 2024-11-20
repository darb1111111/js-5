const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Функция для отображения сохраненных задач
const displayTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Очищаем список перед добавлением новых задач
    taskList.innerHTML = '';

    tasks.forEach((task) => {
        createTaskElement(task.text, task.completed);
    });к
};

// Функция для создания элемента задачи
const createTaskElement = (taskText, completed = false) => {
    // Создание нового элемента li
    let li = document.createElement('li');
    li.textContent = taskText;

    // Создание кнопки удаления
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.style.margin = '5px';
    deleteButton.style.color = 'white';
    deleteButton.style.backgroundColor = 'red';

    // Создание кнопки редактирования
    const editButton = document.createElement('button');
    editButton.textContent = 'Редактировать';

    // Создание чекбокса
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;  // Устанавливаем чекбокс в зависимости от статуса задачи

    // Добавляем элементы в список задач
    taskList.appendChild(li);
    li.appendChild(editButton);
    li.prepend(checkbox);
    li.appendChild(deleteButton);

    // Зачеркиваем задачу, если она завершена
    if (checkbox.checked) {
        li.style.textDecoration = 'line-through';
    }

    // Обработчик изменения состояния чекбокса
    checkbox.onchange = () => {
        if (checkbox.checked) {
            li.style.textDecoration = 'line-through';
        } else {
            li.style.textDecoration = 'none';
        }
        updateTask(taskText, checkbox.checked);  // Обновляем статус задачи в localStorage
    };

    // Обработчик редактирования задачи
    editButton.onclick = () => {
        const newText = prompt('Измените текст задачи', taskText);
        if (newText !== null && newText !== '') {
            li.childNodes[1].textContent = newText;
            updateTask(taskText, checkbox.checked, newText);  // Обновляем задачу в localStorage
        }
    };

    // Обработчик удаления задачи
    deleteButton.onclick = () => {
        li.remove();  // Удаляем задачу из списка
        removeTask(taskText);  // Удаляем задачу из localStorage
    };
};

// Добавление новой задачи
addTaskButton.onclick = () => {
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Введите задачу');
        return;
    }

    // Создаем новую задачу и сохраняем её в localStorage
    createTaskElement(taskText);
    saveTask(taskText);

    // Очищаем поле ввода
    taskInput.value = '';
};

// Функция для сохранения новой задачи в localStorage
const saveTask = (taskText) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Функция для обновления задачи в localStorage
const updateTask = (oldText, completed, newText = oldText) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.text === oldText);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { text: newText, completed: completed };
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
};

// Функция для удаления задачи из localStorage
const removeTask = (taskText) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
};

// Отображаем задачи при загрузке страницы
window.onload = displayTasks;       