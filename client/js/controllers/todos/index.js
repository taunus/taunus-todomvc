'use strict';

var $ = require('dominus');
var taunus = require('taunus');
var skyrocket = require('skyrocket');
var filterTodos = require('../../../../shared/filter-todos');

module.exports = function (viewModel, container, route) {
  handleRealtime(container, viewModel, route);
};

function handleRealtime (container, viewModel, route) {
  var rocket = skyrocket.scope(container, viewModel);
  rocket.on('/todos', reaction);

  function reaction (update) {
    var list = $.findOne('.todo-list');
    var footer = $.findOne('.footer');

    filterTodos(viewModel, route.pathname.slice(1));

    taunus.partial(list, 'todos/list', viewModel);
    taunus.partial(footer, 'todos/footer', viewModel);
  }
}
