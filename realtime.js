'use strict';

var socketIO = require('socket.io');
var io;

function setup (server) {
  if (io) { return io; }
  if (!server) { throw new Error('The `server` argument must be provided.'); }

  io = socketIO(server);
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

module.exports = setup;
