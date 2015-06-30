'use strict';

var $ = require('dominus');
var taunus = require('taunus');
var wiring = require('../../.bin/wiring');
var main = $.findOne('main');

require('./conventions/forms')();
require('./conventions/realtime')();

taunus.mount(main, wiring);
