'use strict';
var todosService = require('../../services/todos');

module.exports = function (req, res, next) {
  todosService.getAll(getAllHandler);

  function getAllHandler (err, todos) {
    res.viewModel = {
      model: {
        active: true,
        todos: todos.filter(function (todo) { return !todo.completed; })
      }
    };
    next();
  }
};
