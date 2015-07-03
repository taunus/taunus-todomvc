'use strict';

var client = require('socket.io-client');
var skyrocket = require('skyrocket');
var gradual = require('gradual');
var io = client('');

function setup () {
  skyrocket.configure({
    revolve: revolve
  });

  skyrocket.op('add', function (target, operation) {
    return target + operation.value;
  });

  gradual.on('data', skyrocket.react);
  io.on('/skyrocket/update', skyrocket.react);

  function revolve (type, rooms) {
    io.emit('/skyrocket/' + type, { rooms: rooms });
  }
}

module.exports = setup;
