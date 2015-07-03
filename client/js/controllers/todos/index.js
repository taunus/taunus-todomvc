'use strict';

var $ = require('dominus');
var taunus = require('taunus');
var skyrocket = require('skyrocket');
var filterTodos = require('../../../../shared/filter-todos');

$.custom('esc', 'keyup', function (e) {
  return e.keyCode === 27;
});

module.exports = function (viewModel, container, route) {
  handleRealtime(container, viewModel, route);
  handleEditing(container);
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

function handleEditing (container) {
  $('html').on('click', onClickOutside);
  var todos = $('.todo-list > li', container).on('dblclick', onDoubleClick);

  function onClickOutside (event) {
    todos.forEach(function (li) {
      $(li).removeClass('editing');
    });
  }

  function onDoubleClick (event) {
    event.stopPropagation();
    var li = $(this).off('dblclick').addClass('editing');
    var input = $.findOne('input.edit', li);
    $(input).focus().on('esc', onEsc).on('click', onClick);

    function onEsc () {
      li.removeClass('editing');
    }

    function onClick (event) {
      event.stopPropagation();
    }
  }
}
