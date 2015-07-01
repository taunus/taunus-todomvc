'use strict';
var _todos = {
  '1': {
    id: 1,
    title: 'Taste JavaScript',
    completed: true
  },
  '2': {
    id: 2,
    title: 'Buy a Unicorn',
    completed: false
  }
};

function getAll (callback) {
  var todos = Object.keys(_todos).map(function (key) {
    return _todos[key];
  });
  callback(null, todos);
}

function getOne (id, callback) {
  callback(null, _todos[id]);
}

function add (todo, callback) {
  todo.id = _todos.length === 0 ? 1 : Object.keys(_todos).reduce(function(a, b) { return Math.max(a, b); }, 0) + 1;
  todo.completed = !!todo.completed;
  _todos['' + todo.id] = todo;
  callback(null, todo);
}

function complete (todo, callback) {
  if (!_todos[todo.id]) { return callback(new Error('not_found')); }
  _todos[todo.id].completed = todo.completed;
  callback(null, _todos[todo.id]);
}

function remove (id, callback) {
  if (!_todos[id]) { return callback(new Error('not_found')); }
  var removedTodo = _todos[id];
  delete _todos[id];
  callback(null, removedTodo);
}

function clearCompleted (callback) {
  var todos = {};
  Object.keys(_todos).map(function (key) {
    return _todos[key];
  }).filter(function (todo) {
    return !todo.completed;
  }).forEach(function (todo) {
    todos[todo.id] = todo;
  });
  _todos = todos;
  callback(null, _todos);
}

module.exports = {
  getAll: getAll,
  getOne: getOne,
  add: add,
  complete: complete,
  remove: remove,
  clearCompleted: clearCompleted
};
