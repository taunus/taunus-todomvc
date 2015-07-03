'use strict';

var $ = require('dominus');
var gradual = require('gradual');
var realtime = require('../../services/realtime');

$.custom('esc', 'keyup', function (e) {
  return e.keyCode === 27;
});

module.exports = function (model, container, route) {
  realtime(model, container);
  handleEditing(container);
};

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
