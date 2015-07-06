'use strict';

var $ = require('dominus');
var taunus = require('taunus');
var wiring = require('../../.bin/wiring');
var main = $.findOne('main');

require('./conventions/realtime')();

taunus.mount(main, wiring, {
  qs: qs
});

function qs (form) {
  return {
    current_path: window.location.pathname
  };
}
