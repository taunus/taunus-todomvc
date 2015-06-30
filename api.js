'use strict';
var taunus = require('taunus');
var todosService = require('./services/todos');

function setup (app) {
  var socket = require('./realtime')();
  app.post('/api/todo', createTodo);

  function createTodo (req, res, next) {
    todosService.add(req.body, addHandler);

    function addHandler (err, todo) {
      var room = '/api/todo';
      var data = {
        updates: [{
          rooms: [room],
          operations: [{
            concern: 'todos',
            op: 'push',
            model: todo
          }]
        }]
      };
      socket.to(room).emit('/skyrocket/update', data);
      res.status(201).json(data);
    }
  }
}

module.exports = setup;
