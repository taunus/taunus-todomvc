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
  callback(null, toArray(_todos));
}

function getOne (id, callback) {
  if (!_todos[id]) { return callback(new Error('not_found')); }
  callback(null, _todos[id]);
}

function add (todo, callback) {
  todo.id = _todos.length === 0 ? 1 : Object.keys(_todos).reduce(function(a, b) { return Math.max(a, b); }, 0) + 1;
  todo.completed = !!todo.completed;
  _todos['' + todo.id] = todo;
  callback(null, todo);
}

function edit (todo, callback) {
  if (!_todos[todo.id]) { return callback(new Error('not_found')); }
  _todos[todo.id].title = todo.title;
  callback(null, _todos[todo.id]);
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
  toArray(_todos).filter(function (todo) {
    return !todo.completed;
  }).forEach(function (todo) {
    todos[todo.id] = todo;
  });
  _todos = todos;
  callback(null, toArray(_todos));
}

function markAllCompleted (callback) {
  Object.keys(_todos).forEach(function (key) {
    _todos[key].completed = true;
  });
  callback(null, toArray(_todos));
}

function toArray (todos) {
  return Object.keys(todos).map(function (key) {
    return todos[key];
  });
}

module.exports = {
  add: add,
  edit: edit,
  getAll: getAll,
  getOne: getOne,
  remove: remove,
  complete: complete,
  clearCompleted: clearCompleted,
  markAllCompleted: markAllCompleted
};
