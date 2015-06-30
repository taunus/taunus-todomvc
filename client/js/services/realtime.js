'use strict';

var taunus = require('taunus');
var skyrocket = require('skyrocket');

function realtime (model, container) {
  var rocket = skyrocket.scope(container, model);
  var options = {
    applyChanges: function (model, update) {
      taunus.navigate('/search/' + update.search);
    }
  };
  rocket.on('/api/search', options, function reaction (update) {});
}

module.exports = realtime;
