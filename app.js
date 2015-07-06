'use strict';

var PORT = process.env.PORT || 3000;
var http = require('http');
var taunus = require('taunus');
var taunusExpress = require('taunus-express');
var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var realtime = require('./realtime');
var routes = require('./routes');
var app = express();
var server = http.Server(app);
var options = {
  routes: require('./controllers/routes'),
  layout: require('./.bin/views/layout')
};

app.use(serveStatic('.bin/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

realtime(server);
routes(app);

taunusExpress(taunus, app, options);

server.listen(PORT, listening);

function listening () {
  console.log('App running on http://localhost:%d', PORT);
}
