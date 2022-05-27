
const todoFormEl = document.getElementById('todoForm');
const newTodoInputEl = document.getElementById('newTodoInput');
const todoListEl = document.getElementById('todoList');

console.log(todoFormEl, newTodoInputEl, todoListEl);

const state = {
  newTodo: '',
  todos: [],
}

async function init() {
  await fetchTodos();
  
  // Render the view based on state
  renderNewTodo();
  renderTodos();

  // Add event listeners
  newTodoInputEl.addEventListener('input', handleNewTodoInput);
  todoFormEl.addEventListener('submit', handleTodoFormSubmit);

  // Focus on the input
  newTodoInputEl.focus();
}

// "FETCHING" TODOS

function fetchTodos() {
  return new Promise(function(resolve) {
    setTimeout(function () {
      state.todos = [
        { id: 1, task: 'Cook lunch' },
        { id: 2, task: 'Set the table' },  
      ];
      resolve();
    }, 500);
  });
}

function createTodo(task) {
  return {
    id: nextTodoId(),
    task: task,
  }
}

function nextTodoId() {
  if (state.todos.length === 0) {
    return 1;
  }

  let todoIds = state.todos.map((todo) => todo.id);
  return Math.max(...todoIds) + 1;
}

// RENDERING

function renderNewTodo() {
  newTodoInputEl.value = state.newTodo;
}

function renderTodos() {
  todoListEl.innerHTML = '';

  state.todos.forEach((todo) => {
    todoListEl.appendChild(createTodoListItemElement(todo));
  });
}

function createTodoListItemElement(todo) {
  let todoListItemEl = document.createElement('li');
  todoListItemEl.id = todo.id;
  
  let todoListItemText = document.createTextNode(todo.task);
  todoListItemEl.appendChild(todoListItemText);
  todoListItemEl.appendChild(createDeleteTodoButton(todo));
  
  return todoListItemEl;
}

function createDeleteTodoButton(todo) {
  let deleteTodoEl = document.createElement('button');
  deleteTodoEl.textContent = 'X';
  deleteTodoEl.addEventListener('click', handleDeleteTodoClick);
  deleteTodoEl.dataset['todoId'] = todo.id;
  
  return deleteTodoEl;
}

// EVENT HANDLING

function handleNewTodoInput(event) {
  state.newTodo = newTodoInputEl.value;
}

function handleTodoFormSubmit(event) {
  event.preventDefault();

  state.todos = [...state.todos, createTodo(newTodoInputEl.value)];
  state.newTodo = '';

  renderTodos();
  renderNewTodo();
}

function handleDeleteTodoClick(event) {
  let todoId = event.target.dataset['todoId'];
  state.todos = state.todos.filter(todo => todo.id != todoId);

  renderTodos();
}

document.addEventListener('DOMContentLoaded', init, false);