'use strict';

var todosService = require('../../../services/todos');
var redirect = require('../redirect');
var emit = require('../socket-emit');

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

    redirect(req, res);

    var room = '/todos';
    emit(req, room, {
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
  }
}

module.exports = completeTodo;
