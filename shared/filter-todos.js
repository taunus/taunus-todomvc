'use strict';

function filterTodos (model, currentPath, options) {
  options = options || {};

  var activeTodos = model.todos.filter(function (todo) {
    return !todo.completed;
  });
  var completedTodos = model.todos.filter(function (todo) {
    return todo.completed;
  });

  if (options.counts) {
    model.activeTodosCount = activeTodos.length;
    model.completedTodosCount = completedTodos.length;
  }

  switch (currentPath) {
    case 'active':
      model.todos = activeTodos;
      break;
    case 'completed':
      model.todos = completedTodos;
      break;
  }
}

module.exports = filterTodos;
