'use strict';
var redirect = require('../redirect');
var socket = require('../../../realtime');
var todosService = require('../../../services/todos');

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
    socket.io.to(room).emit('/skyrocket/update', {
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
