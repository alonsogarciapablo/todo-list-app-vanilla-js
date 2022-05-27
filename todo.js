
const todoFormEl = document.getElementById('todoForm');
const newTodoInputEl = document.getElementById('newTodoInput');
const todoListEl = document.getElementById('todoList');

console.log(todoFormEl, newTodoInputEl, todoListEl);

const state = {
  newTodo: '',
  todos: [
    { id: 1, task: 'Cook lunch' },
    { id: 2, task: 'Set the table' },
  ],
}

function init() {
  // Render the view based on state
  renderNewTodo();
  renderTodos();

  // Add event listeners
  newTodoInputEl.addEventListener('input', handleNewTodoInput);
  todoFormEl.addEventListener('submit', handleTodoFormSubmit);

  // Focus on the input
  newTodoInputEl.focus();
}

// RENDERING

function renderNewTodo() {
  newTodoInputEl.value = state.newTodo;
}

function renderTodos() {
  todoListEl.innerHTML = '';

  state.todos.forEach((todo) => {
    let todoItemEl = document.createElement('li');
    todoItemEl.id = todo.id;
    todoItemEl.innerHTML = todo.task;
    todoListEl.appendChild(todoItemEl);
  });
}

// EVENT HANDLING

function handleNewTodoInput(event) {
  state.newTodo = newTodoInputEl.value;
}

function handleTodoFormSubmit(event) {
  event.preventDefault();

  state.todos.push({
    id: 3,
    task: newTodoInputEl.value,
  })
  state.newTodo = '';

  renderTodos();
  renderNewTodo();
}

document.addEventListener('DOMContentLoaded', init, false);