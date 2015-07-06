'use strict';
var url = require('url');
var taunus = require('taunus');
var todosService = require('./services/todos');

function setup(app) {
  var socket = require('./realtime');
  app.post('/api/todo', require('./controllers/forms/todos/create'));
  app.post('/api/todo/:id/edit', require('./controllers/forms/todos/edit'));
  app.post('/api/todo/:id/remove', require('./controllers/forms/todos/remove'));
  app.post('/api/todo/:id/complete', require('./controllers/forms/todos/complete'));
  app.post('/api/todo/clear-completed', require('./controllers/forms/todos/clear-completed'));
  app.post('/api/todo/mark-all-completed', require('./controllers/forms/todos/mark-all-completed'));
}

module.exports = setup;
