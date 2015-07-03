'use strict';
var todosService = require('../../services/todos');

module.exports = function (req, res, next) {
  var currentPath = req.route.path.slice(1);
  todosService.getAll(getAllHandler);

  function getAllHandler (err, todos) {
    if (err) {
      return next(err);
    }

    var activeTodos = todos.filter(function (todo) {
      return !todo.completed;
    });
    var completedTodos = todos.filter(function (todo) {
      return todo.completed;
    });

    switch (currentPath) {
      case 'active':
        todos = activeTodos;
        break;
      case 'completed':
        todos = completedTodos;
        break;
    }
    res.viewModel = {
      model: {
        all: currentPath === '',
        active: currentPath === 'active',
        completed: currentPath === 'completed',
        activeTodosCount: activeTodos.length,
        completedTodosCount: completedTodos.length,
        todos: todos
      }
    };
    next();
  }
};
