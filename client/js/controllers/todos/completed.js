'use strict';

var realtime = require('../../services/realtime');

module.exports = function (model, container, route) {
  realtime(model, container);
};
