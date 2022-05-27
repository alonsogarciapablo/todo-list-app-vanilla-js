
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
}

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

document.addEventListener('DOMContentLoaded', init, false);