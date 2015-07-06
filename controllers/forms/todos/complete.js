'use strict';
var redirect = require('../redirect');
var socket = require('../../../realtime');
var todosService = require('../../../services/todos');

function completeTodo (req, res, next) {
  var completed = req.body.completed === 'true';
  var todo = {
    id: req.params.id,
    completed: !completed
  };
  todosService.complete(todo, handler);

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
          op: 'mark-completed',
          model: todo,
          concern: 'todos',
          query: { id: todo.id }
        }, {
          op: 'add',
          value: todo.completed ? -1 : 1,
          concern: 'activeTodosCount'
        }, {
          op: 'add',
          value: todo.completed ? 1 : -1,
          concern: 'completedTodosCount'
        }]
      }]
    });

    redirect(req, res);
  }
}

module.exports = completeTodo;
