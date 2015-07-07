'use strict';

var socket = require('../../realtime');

function emit (req, room, options) {
  socket.io.to(room).except(req.query.sid).emit('/skyrocket/update', options);
}

module.exports = emit;
