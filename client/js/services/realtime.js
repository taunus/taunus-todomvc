'use strict';

var taunus = require('taunus');
var skyrocket = require('skyrocket');
var $ = require('dominus');

function realtime (model, container) {
  var rocket = skyrocket.scope(container, model);
  var options = {
    applyChanges: function (model, update) {
      // TODO
    }
  };
  rocket.on('/api/todo', options, function reaction (update) {});
}

module.exports = realtime;
