'use strict';

var socket = require('socket.io');
var io;

function realtime (server) {
  if (io) { return io; }
  io = realtime.io = addExceptMethod(socket(server));
  io.on('connection', connected);
  return io;

  function connected (socket) {
    socket.on('error', console.error.bind(console));
    socket.on('/skyrocket/join', join);
    socket.on('/skyrocket/leave', leave);

    function join (data) {
      data.rooms.forEach(socket.join, socket);
    }
    function leave (data) {
      data.rooms.forEach(socket.leave, socket);
    }
  }
}

function addExceptMethod (io) {
  var sockets = io.sockets;
  var _broadcast = sockets.adapter.broadcast;

  sockets.constructor.prototype.except = except;
  sockets.adapter.broadcast = broadcast;
  return io;

  function except (id) {
    this.excepts = this.excepts || [];
    this.excepts.push(id);
    return this;
  }
  function broadcast (packet, options) {
    if (sockets.excepts) {
      options.except = sockets.excepts;
    }
    _broadcast.apply(this, arguments);
    delete sockets.excepts;
  }
}

module.exports = realtime;
