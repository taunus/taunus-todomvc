'use strict';

function filterTodos (model, currentPath, options) {
  options = options || {};

  var completedTodos = [];
  var activeTodos = [];

  model.todos.forEach(function (todo) {
    if (todo.completed) {
      completedTodos.push(todo);
    } else {
      activeTodos.push(todo);
    }
  });

  if (options.counts) {
    model.todosCount = model.todos.length;
    model.activeTodosCount = activeTodos.length;
    model.completedTodosCount = completedTodos.length;
  }

  if (currentPath === 'completed') {
    model.todos = completedTodos;
  } else if (currentPath === 'active') {
    model.todos = activeTodos;
  }
}

module.exports = filterTodos;
