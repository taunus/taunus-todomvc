'use strict';

var $ = require('dominus');
var gradual = require('gradual');
var realtime = require('../../services/realtime');

module.exports = function (model, container, route) {
  realtime(model, container);
  handleTodosUpdate(container);
};

function handleTodosUpdate(container) {
  var forms = $.find('.form-update-todo', container);
  forms.forEach(function (form) {
    var checkbox = $('input[name=completed]', form);
    checkbox.on('change', submitUpdate);

    function submitUpdate() {
      gradual.submit({
        form: form
      });
    }
  });
}
