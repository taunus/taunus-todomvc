'use strict';

var $ = require('dominus');
var gradual = require('gradual');
var realtime = require('../../services/realtime');

module.exports = function (model, container, route) {
  realtime(model, container);
  handleTogglesChange(container);
};

function handleTogglesChange (container) {
  var forms = $.find('.form-update-todo', container).concat($.find('.form-mark-all-completed', container));
  forms.forEach(function (form) {
    $('input[type=checkbox]', form).on('change', submitUpdate);

    function submitUpdate () {
      gradual.submit({ form: form });
    }
  });
}
