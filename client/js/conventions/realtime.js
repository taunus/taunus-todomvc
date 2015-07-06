'use strict';

var client = require('socket.io-client');
var skyrocket = require('skyrocket');
var taunus = require('taunus');
var io = client('');

function setup () {
  skyrocket.configure({
    revolve: revolve
  });

  skyrocket.op('add', function (target, operation) {
    return target + operation.value;
  });

  skyrocket.op('mark-completed', function (target, operation) {
    var found = target.some(function (todo, index) {
      if (todo.id === operation.model.id) {
        target[index] = operation.model;
        return true;
      }
    });

    if (!found) {
      var currentPath = window.location.pathname.slice(1);
      var insertTodo = (currentPath === 'active' && operation.model.completed === false) ||
        (currentPath === 'completed' && operation.model.completed === true);
      if (insertTodo) {
        target.push(operation.model);
      }
    }

    return target;
  });

  taunus.gradual.on('data', skyrocket.react);
  io.on('/skyrocket/update', skyrocket.react);

  function revolve (type, rooms) {
    io.emit('/skyrocket/' + type, { rooms: rooms });
  }
}

module.exports = setup;
