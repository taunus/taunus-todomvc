'use strict';

var todosService = require('../../../services/todos');
var redirect = require('../redirect');
var emit = require('../socket-emit');

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

    redirect(req, res);

    var room = '/todos';
    emit(req, room, {
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
  }
}

module.exports = editTodo;
