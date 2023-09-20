"use strict";

var users = [];

exports.newUserJoin = function (_ref) {
  var id = _ref.id,
      room = _ref.room;
  users.push({
    id: id,
    room: room
  });
};

exports.removeUser = function (id) {
  var index = users.findIndex(function (user) {
    user.id === id;
  });
  users.splice(index, 1);
};