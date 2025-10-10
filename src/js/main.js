/* eslint-disable indent */
// Main JavaScript file for To Do App

let tasks = [];

/** FETCH DATA FROM INPUTS */
const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const description = document.getElementById('task-description');
const dueDate = document.getElementById('task-due-date');
const dueTime = document.getElementById('task-due-time');
const priority = document.getElementById('task-priority');
const taskList = document.getElementById('task-list');

/** FUNCTION TO ADD TASK TO LIST */
function handleFormSubmit(event) {
    event.preventDefault();
    const task = {
        id: Date.now(),
        name: taskInput.value,
        description: description.value,
        dueDate: dueDate.value,
        dueTime: dueTime.value,
        priority: priority.value,
        completed: false
    };
    tasks.push(task);
    displayTasks();
    form.reset();
}

// FUNCTION TO HANDLE BUTTON CLICK
function handleButtonClick(event) {
    if (event.target.classList.contains('delete-btn')) {
        const taskId = parseInt(event.target.closest('li').querySelector('input[type="checkbox"]').id.replace('task-', ''), 10);
        deleteTask(taskId);
    } else if (event.target.classList.contains('edit-btn')) {
        const taskId = parseInt(event.target.closest('li').querySelector('input[type="checkbox"]').id.replace('task-', ''), 10);
        editTask(taskId);
    } else if (event.target.classList.contains('save-btn')) {
        const taskId = parseInt(event.target.closest('li').querySelector('input[type="checkbox"]').id.replace('task-', ''), 10);
        saveTask(taskId);
    } else if (event.target.classList.contains('cancel-btn')) {
        const taskId = parseInt(event.target.closest('li').querySelector('input[type="checkbox"]').id.replace('task-', ''), 10);
        cancelEdit(taskId);
    }
}

// EDIT FUNCTION
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const taskElement = document.getElementById(`task-${taskId}`).closest('li');
        taskElement.innerHTML = `
            <input type="checkbox" id="task-${task.id}" aria-label="Mark Task as Completed" ${task.completed ? 'checked' : ''}>
            <input type="text" id="edit-name-${task.id}"  value="${task.name}">
            <input type="text" id="edit-desc-${task.id}" value="${task.description}">
            <input type="date" id="edit-date-${task.id}" value="${task.dueDate}">
            <input type="time" id="edit-time-${task.id}" value="${task.dueTime}">
            <select id="edit-priority-${task.id}" class="edit-input">
                <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
                <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
                <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
            </select>
            <button class="save-btn" aria-label="Save Changes">Save</button>
            <button class="cancel-btn" aria-label="Cancel Changes">Cancel</button>
        `;
    }
}

// DELETE FUNCTION
function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        displayTasks();
        }
    }


// SAVE FUNCTION
function saveTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.name = document.getElementById(`edit-name-${taskId}`).value;
        task.description = document.getElementById(`edit-desc-${taskId}`).value;
        task.dueDate = document.getElementById(`edit-date-${taskId}`).value;
        task.dueTime = document.getElementById(`edit-time-${taskId}`).value;
        task.priority = document.getElementById(`edit-priority-${taskId}`).value;
        displayTasks();
    }
}

// CANCEL EDIT FUNCTION
function cancelEdit(taskId) {
    displayTasks();
}

/** CONTROL FUNCTIONS */
function markAllAsComplete() {
    tasks.forEach(task => {
        task.completed = true;
    });
    displayTasks();
}

function deleteCompletedTasks() {
    if (confirm('Are you sure you want to delete all completed tasks?')) {
        tasks = tasks.filter(task => !task.completed);
        displayTasks();
    }
}

function deleteAllTasks() {
    if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone!')) {
        tasks = [];
        displayTasks();
    }
}


/** FUNCTION TO DISPLAY TASKS */
function displayTasks() {
    taskList.innerHTML = '';
    for (const task of tasks) {
        const listItem = `
        <li class="task-item ${task.completed ? 'completed' : ''}">
            <input type="checkbox" id="task-${task.id}" aria-label="Mark Task as Completed" ${task.completed ? 'checked' : ''}>
            <span class="task-name">${task.name}</span>
            <span class="task-desc">${task.description}</span>
            <span class="task-due">${task.dueDate} ${task.dueTime}</span>
            <span class="task-priority ${task.priority.toLowerCase()}">${task.priority}</span>
            <button class="edit-btn" aria-label="Edit Task">Edit</button>
            <button class="delete-btn" aria-label="Delete Task">Delete</button>
        </li>
        `;
        taskList.innerHTML += listItem;
    }
}

/** FUNCTION TO TOGGLE TASK COMPLETION */
function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        displayTasks();
    }
}

/** CONTROL BUTTONS */
const markAllCompleteBtn = document.getElementById('mark-all-complete');
const deleteCompletedBtn = document.getElementById('delete-completed');
const deleteAllBtn = document.getElementById('delete-all');

/** EVENT LISTENERS */
form.addEventListener('submit', handleFormSubmit);
taskList.addEventListener('change', handleCheckboxChange);
taskList.addEventListener('click', handleButtonClick);

// Control button event listeners
markAllCompleteBtn.addEventListener('click', markAllAsComplete);
deleteCompletedBtn.addEventListener('click', deleteCompletedTasks);
deleteAllBtn.addEventListener('click', deleteAllTasks);

function handleCheckboxChange(event) {
    if (event.target.type === 'checkbox') {
        const taskId = parseInt(event.target.id.replace('task-', ''), 10);
        toggleTask(taskId);
    }
}

/** CONTROL FUNCTIONS */
function markAllAsComplete() {
    tasks.forEach(task => {
        task.completed = true;
    });
    displayTasks();
}

function deleteCompletedTasks() {
    if (confirm('Are you sure you want to delete all completed tasks?')) {
        tasks = tasks.filter(task => !task.completed);
        displayTasks();
    }
}

function deleteAllTasks() {
    if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone!')) {
        tasks = [];
        displayTasks();
    }
}