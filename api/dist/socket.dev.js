"use strict";

var socketio = require("socket.io");

module.exports = function (httpServer) {
  var io = socketio(httpServer, {
    cors: {
      origin: "http://localhost:4200"
    }
  });
  io.on("connection", function (socket) {
    console.log("new user connected to server");
    socket.on("join", function (joinPath, cb) {
      socket.rooms.size = 0;
      socket.join(joinPath);
      cb(joinPath);
    });
    socket.on("onAddComment", function (_ref) {
      var newComment = _ref.newComment,
          joinPath = _ref.joinPath;
      console.log("path : " + joinPath);
      socket.broadcast.to(joinPath).emit("onGetComment", {
        newComment: newComment,
        joinPath: joinPath
      });
    });
    socket.on("disconnect", function () {
      io.emit("sendMessage", "user has been left !");
    });
  });
};