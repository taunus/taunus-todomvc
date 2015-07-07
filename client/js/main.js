'use strict';

var $ = require('dominus');
var taunus = require('taunus');
var wiring = require('../../.bin/wiring');
var realtime = require('./conventions/realtime');
var main = $.findOne('main');

realtime();

function generateQueryString () {
  return {
    current_path: window.location.pathname,
    sid: realtime.id ? realtime.id : null
  };
}

taunus.mount(main, wiring, {
  qs: generateQueryString
});
