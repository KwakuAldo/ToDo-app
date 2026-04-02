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
const totalTasksElement = document.getElementById('total-tasks');
const completedTasksElement = document.getElementById('completed-tasks');

/** CONTROL BUTTONS */
const markAllCompleteBtn = document.getElementById('mark-all-complete');
const deleteCompletedBtn = document.getElementById('delete-completed');
const deleteAllBtn = document.getElementById('delete-all');

/** FORM VALIDATION FUNCTION */
function validateForm() {
    const errors = [];

    // CHECK IF TASK NAME IS EMPTY
    if (taskInput.value.trim() === '') {
        errors.push('Task name cannot be empty.');
    }

    // CHECK IF TASK NAME IS TOO LONG
    if (taskInput.value.length > 100) {
        errors.push('Task name cannot exceed 100 characters.');
    }

    // CHECK IF DESCRIPTION IS TOO LONG
    if (description.value.length > 300) {
        errors.push('Description cannot exceed 300 characters.');
    }

    // CHECK IF DUE DATE IS IN THE PAST
    const today = new Date();
    const selectedDate = new Date(dueDate.value);
    if (dueDate.value && selectedDate < today.setHours(0, 0, 0, 0)) {
        errors.push('Due date cannot be in the past.');
    }

    return errors;
}

/** FUNCTION TO SHOW ERRORS */
function showErrors(errors) {
    // CREATE ERROR MESSAGE ELEMENT
    const errorDiv = document.createElement('div');
    errorDiv.id = 'form-errors';
    errorDiv.className = 'error-messages';
    errorDiv.innerHTML = errors.map(err => `<p>${err}</p>`).join('');
    form.appendChild(errorDiv);
}

/** FUNCTION TO CLEAR ERRORS */
function clearErrors() {
    const existingErrors = document.getElementById('form-errors');
    if (existingErrors) {
        existingErrors.remove();
    }
}

/** FUNCTION TO ADD TASK TO LIST */
function handleFormSubmit(event) {
    event.preventDefault();

    // VALIDATE FORM
    const errors = validateForm();
    if (errors.length > 0) {
        showErrors(errors);
        return;
    }

    // CLEAR ANY PREVIOUS ERRORS
    clearErrors();

    // ADD TASK TO LIST
    const task = {
        id: Date.now(),
        name: taskInput.value.trim(),
        description: description.value.trim(),
        dueDate: dueDate.value,
        dueTime: dueTime.value,
        priority: priority.value,
        completed: false
    };
    tasks.push(task);
    displayTasks();
    form.reset();
    saveTasksToStorage();
    updateTaskCounts();
}

/** FUNCTION TO DISPLAY TASKS */
function displayTasks() {
    taskList.innerHTML = '';
    for (const task of tasks) {
        const listItem = `
        <li class="task-item ${task.completed ? 'completed' : ''}">
            <div class="task-checkbox">
                <input type="checkbox" id="task-${task.id}" aria-label="Mark Task as Completed" ${task.completed ? 'checked' : ''}>
            </div>
            <div class="task-content">
                <div class="task-name">${task.name}</div>
                <div class="task-desc">${task.description}</div>
                <div class="task-due">📅 ${task.dueDate} ${task.dueTime}</div>
            </div>
            <div class="task-priority ${task.priority.toLowerCase()}">${task.priority}</div>
            <div class="task-actions">
                <button class="btn btn--sm btn--secondary edit-btn" aria-label="Edit Task">✏️ Edit</button>
                <button class="btn btn--sm btn--danger delete-btn" aria-label="Delete Task">🗑️ Delete</button>
            </div>
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
        saveTasksToStorage();
        updateTaskCounts();
    }
}

/** FUNCTION TO HANDLE BUTTON CLICK */
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

/** EDIT FUNCTION */
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const taskElement = document.getElementById(`task-${taskId}`).closest('li');
        taskElement.innerHTML = `
            <div class="task-checkbox">
                <input type="checkbox" id="task-${task.id}" aria-label="Mark Task as Completed" ${task.completed ? 'checked' : ''}>
            </div>
            <div class="task-content">
                <input type="text" class="form-input" id="edit-name-${task.id}" value="${task.name}" placeholder="Task name">
                <textarea class="form-textarea" id="edit-desc-${task.id}" placeholder="Description">${task.description}</textarea>
                <div class="edit-row">
                    <input type="date" class="form-input" id="edit-date-${task.id}" value="${task.dueDate}">
                    <input type="time" class="form-input" id="edit-time-${task.id}" value="${task.dueTime}">
                </div>
            </div>
            <select id="edit-priority-${task.id}" class="form-select">
                <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
                <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
                <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
            </select>
            <div class="task-actions">
                <button class="btn btn--sm btn--success save-btn" aria-label="Save Changes">💾 Save</button>
                <button class="btn btn--sm btn--secondary cancel-btn" aria-label="Cancel Changes">❌ Cancel</button>
            </div>
        `;
    }
}

/** DELETE FUNCTION */
function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        displayTasks();
        saveTasksToStorage();
        updateTaskCounts();
    }
}

/** SAVE FUNCTION */
function saveTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.name = document.getElementById(`edit-name-${taskId}`).value.trim();
        task.description = document.getElementById(`edit-desc-${taskId}`).value.trim();
        task.dueDate = document.getElementById(`edit-date-${taskId}`).value;
        task.dueTime = document.getElementById(`edit-time-${taskId}`).value;
        task.priority = document.getElementById(`edit-priority-${taskId}`).value;
        displayTasks();
        saveTasksToStorage();
        updateTaskCounts();
    }
}

/** CANCEL EDIT FUNCTION */
function cancelEdit() {
    displayTasks();
}

/** CONTROL FUNCTIONS */
function markAllAsComplete() {
    tasks.forEach(task => {
        task.completed = true;
    });
    displayTasks();
    saveTasksToStorage();
}

function deleteCompletedTasks() {
    if (confirm('Are you sure you want to delete all completed tasks?')) {
        tasks = tasks.filter(task => !task.completed);
        displayTasks();
        saveTasksToStorage();
        updateTaskCounts();
    }
}

function deleteAllTasks() {
    if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone!')) {
        tasks = [];
        displayTasks();
        saveTasksToStorage();
        updateTaskCounts();
    }
}

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

// FUNCTION TO SAVE TASKS TO LOCAL STORAGE
function saveTasksToStorage() {
    // CONVERT TASKS ARRAY TO JSON STRING
    const tasksJson = JSON.stringify(tasks);
    // SAVE TO LOCAL STORAGE WITH KEY 'todo-tasks'
    localStorage.setItem('todo-tasks', tasksJson);

    console.log('Tasks saved to local storage:', tasks);
}

// FUNCTION TO LOAD TASKS FROM LOCAL STORAGE
function loadTasksFromStorage() {
    // GET THE SAVED TASKS FROM LOCAL STORAGE
    const tasksJson = localStorage.getItem('todo-tasks');
    if (tasksJson) {
        try {
            tasks = JSON.parse(tasksJson);
            console.log('Tasks loaded from local storage:', tasks);
        } catch (error) {
            console.error('Error parsing tasks from local storage:', error);
            tasks = [];
        }
    } else {
        console.log('No tasks found in local storage.');
        tasks = [];
    }
}

// FUNCTION TO UPDATE TASK COUNTS
function updateTaskCounts() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    // UPDATE THE COUNTER ELEMENTS
    totalTasksElement.textContent = total;
    completedTasksElement.textContent = completed;

    console.log(`Task counts updated. Total: ${total}, Completed: ${completed}, Pending: ${pending}`);
}

loadTasksFromStorage();
displayTasks();
updateTaskCounts();
