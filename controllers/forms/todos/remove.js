'use strict';
var redirect = require('../redirect');
var socket = require('../../../realtime');
var todosService = require('../../../services/todos');

function removeTodo (req, res, next) {
  todosService.remove(req.params.id, handler);

  function handler(err, todo) {
    if (err) {
      return next(err);
    }

    res.viewModel = {
      model: todo
    };

    var room = '/todos';
    socket.io.to(room).emit('/skyrocket/update', {
      updates: [{
        rooms: [room],
        operations: [{
          op: 'remove',
          concern: 'todos',
          query: { id: todo.id }
        }, {
          op: 'add',
          value: -1,
          concern: todo.completed ? 'completedTodosCount' : 'activeTodosCount'
        }]
      }]
    });

    redirect(req, res);
  }
}

module.exports = removeTodo;
