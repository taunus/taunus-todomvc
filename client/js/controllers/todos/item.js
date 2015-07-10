'use strict';

var $ = require('dominus');

$.custom('esc', 'keyup', function (e) {
  return e.keyCode === 27;
});

module.exports = function (viewModel, container, route) {
  var todo = $(container).on('dblclick', onDoubleClick);
  $('html').on('click', cancelEditing);

  function onDoubleClick (event) {
    event.stopPropagation();
    todo.off('dblclick').addClass('editing');
    var input = $.findOne('input.edit', todo);
    $(input).focus().on('esc', cancelEditing).on('click', onClick);

    function onClick (event) {
      event.stopPropagation();
    }
  }

  function cancelEditing () {
    todo.removeClass('editing');
  }
};
