'use strict';

var todosService = require('../../../services/todos');
var redirect = require('../redirect');
var emit = require('../socket-emit');

function clearCompletedTodos (req, res, next) {
  todosService.clearCompleted(handler);

  function handler(err, todos) {
    if (err) {
      return next(err);
    }

    res.viewModel = {
      model: todos
    };

    redirect(req, res);

    var room = '/todos';
    emit(req, room, {
      updates: [{
        rooms: [room],
        model: {
          todos: todos,
          completedTodosCount: 0
        }
      }]
    });
  }
}

module.exports = clearCompletedTodos;
