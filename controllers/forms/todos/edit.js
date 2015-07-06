'use strict';
var redirect = require('../redirect');
var socket = require('../../../realtime');
var todosService = require('../../../services/todos');

function editTodo (req, res, next) {
  var todo = {
    id: req.params.id,
    title: req.body.title
  };
  todosService.edit(todo, handler);

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
          op: 'edit',
          model: todo,
          concern: 'todos',
          query: { id: todo.id }
        }]
      }]
    });

    redirect(req, res);
  }
}

module.exports = editTodo;
