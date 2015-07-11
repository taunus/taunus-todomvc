'use strict';

var todosService = require('../../../services/todos');
var redirect = require('../redirect');
var emit = require('../socket-emit');

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
    emit(req, room, {
      updates: [{
        rooms: [room],
        operations: [{
          op: 'push',
          model: todo,
          concern: 'todos'
        }, {
          op: 'add',
          value: 1,
          concern: 'todosCount'
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
