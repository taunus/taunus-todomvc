'use strict';
var todosService = require('../../services/todos');

module.exports = function (req, res, next) {
  var currentPath = req.route.path.slice(1);
  todosService.getAll(getAllHandler);

  function getAllHandler (err, todos) {
    var activeTodos = todos.filter(function (todo) {
      return !todo.completed;
    });

    switch (currentPath) {
      case 'active':
        todos = activeTodos;
        break;
      case 'completed':
        todos = todos.filter(function (todo) {
          return todo.completed;
        });
        break;
    }
    res.viewModel = {
      model: {
        all: currentPath === '',
        active: currentPath === 'active',
        completed: currentPath === 'completed',
        todosLeft: activeTodos.length,
        todos: todos
      }
    };
    next();
  }
};
