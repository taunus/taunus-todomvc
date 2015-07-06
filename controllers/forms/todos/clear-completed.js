'use strict';
var redirect = require('../redirect');
var socket = require('../../../realtime');
var todosService = require('../../../services/todos');

function clearCompletedTodos (req, res, next) {
  todosService.clearCompleted(handler);

  function handler(err, todos) {
    if (err) {
      return next(err);
    }

    res.viewModel = {
      model: todos
    };

    var room = '/todos';
    socket.io.to(room).emit('/skyrocket/update', {
      updates: [{
        rooms: [room],
        model: {
          todos: todos,
          completedTodosCount: 0
        }
      }]
    });

    redirect(req, res);
  }
}

module.exports = clearCompletedTodos;
