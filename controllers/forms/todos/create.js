'use strict';
var redirect = require('../redirect');
var socket = require('../../../realtime');
var todosService = require('../../../services/todos');

function createTodo (req, res, next) {
  todosService.add(req.body, handler);

  function handler(err, todo) {
    if (err) {
      return next(err);
    }

    res.viewModel = {
      model: todo
    };

    redirect(req, res);

    var room = '/todos';
    socket.io.to(room).emit('/skyrocket/update', {
      updates: [{
        rooms: [room],
        operations: [{
          op: 'push',
          model: todo,
          concern: 'todos'
        }, {
          op: 'add',
          value: 1,
          concern: 'activeTodosCount'
        }]
      }]
    });
  }
}

module.exports = createTodo;
