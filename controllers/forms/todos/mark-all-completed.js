'use strict';

var todosService = require('../../../services/todos');
var redirect = require('../redirect');
var emit = require('../socket-emit');

function markAllTodosCompleted (req, res, next) {
  todosService.markAllCompleted(handler);

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
          activeTodosCount: 0,
          completedTodosCount: todos.length
        }
      }]
    });
  }
}

module.exports = markAllTodosCompleted;
