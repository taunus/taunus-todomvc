'use strict';
var todosService = require('../../services/todos');
var filterTodos = require('../../shared/filter-todos');

module.exports = function (req, res, next) {
  var currentPath = req.route.path.slice(1);
  todosService.getAll(getAllHandler);

  function getAllHandler (err, todos) {
    if (err) {
      return next(err);
    }

    var viewModel = {
      model: {
        all: currentPath === '',
        active: currentPath === 'active',
        completed: currentPath === 'completed',
        activeTodosCount: 0,
        completedTodosCount: 0,
        todos: todos
      }
    };

    filterTodos(viewModel.model, currentPath, {
      counts: true
    });

    res.viewModel = viewModel;

    next();
  }
};
