'use strict';

var todosService = require('../../../services/todos');
var redirect = require('../redirect');
var emit = require('../socket-emit');

function removeTodo (req, res, next) {
  todosService.remove(req.params.id, handler);

  function handler(err, todo) {
    if (err) {
      return next(err);
    }

    res.viewModel = {
      model: todo
    };

    redirect(req, res);

    var room = '/todos';
    emit(req, room, {
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
  }
}

module.exports = removeTodo;
