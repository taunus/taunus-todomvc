'use strict';

var $ = require('dominus');
var gradual = require('gradual');
var realtime = require('../../services/realtime');

module.exports = function (model, container, route) {
  realtime(model, container);
  handleEditing(container);
};

function handleEditing (container) {
  $.find('.todo-list > li', container).on('dblclick', function (event) {
    // TODO: should get element from `event.currentTarget` but it's `null`
    var li = $(event.target).parents('li').addClass('editing');
    var input = $.findOne('input.edit', li).focus();
    // TODO: cancel edition on ESC or click outside
  });
}
