'use strict';
var url = require('url');
var taunus = require('taunus');
var todosService = require('./services/todos');

function setup(app) {
  var socket = require('./realtime')();
  app.post('/api/todo', createTodo);
  app.post('/api/todo/:id/edit', editTodo);
  app.post('/api/todo/:id/remove', removeTodo);
  app.post('/api/todo/:id/complete', completeTodo);
  app.post('/api/todo/clear-completed', clearCompletedTodos);
  app.post('/api/todo/mark-all-completed', markAllTodosCompleted);

  function createTodo (req, res, next) {
    todosService.add(req.body, handler);

    function handler(err, todo) {
      if (err) {
        return next(err);
      }

      res.viewModel = {
        model: todo
      };

      // var room = '/api/todo';
      // socket.to(room).emit('/skyrocket/update', {
      //   updates: [{
      //     rooms: [room],
      //     concern: 'todos',
      //     op: 'push',
      //     model: todo
      //   }]
      // });

      redirect(req, res);
    }
  }

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
    }
  }

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
    }
  }

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
    }
  }

  function clearCompletedTodos (req, res, next) {
    todosService.clearCompleted(handler);

    function handler(err, todos) {
      if (err) {
        return next(err);
      }

      res.viewModel = {
        model: todos
      };

      redirect(req, res);
    }
  }

  function markAllTodosCompleted (req, res, next) {
    todosService.markAllCompleted(handler);

    function handler(err, todos) {
      if (err) {
        return next(err);
      }

      res.viewModel = {
        model: todos
      };

      redirect(req, res);
    }
  }
}

function redirect (req, res) {
  var redirectTo = req.headers.referer ? url.parse(req.headers.referer).path : '';
  taunus.redirect(req, res, redirectTo, {
    force: true
  });
}

module.exports = setup;
