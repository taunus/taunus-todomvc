'use strict';

var url = require('url');
var taunus = require('taunus');

function redirect (req, res) {
  var redirectTo = req.headers.referer ? url.parse(req.headers.referer).path : req.query.current_path;
  taunus.redirect(req, res, redirectTo, {
    force: true
  });
}

module.exports = redirect;
