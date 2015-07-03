'use strict';

var $ = require('dominus');
var taunus = require('taunus');
var gradual = require('gradual');

gradual.configure({
  taunus: taunus,
  qs: function (form) {
    return {
      current_path: window.location.pathname
    };
  }
});

function forms () {
  taunus.on('render', render);
}

function render (container) {
  $('form', container).on('submit', gradual.hijack);
}

module.exports = forms;
