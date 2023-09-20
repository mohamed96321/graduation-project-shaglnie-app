"use strict";

var http = require("http");

var app = require("./backend/app");

var port = process.env.PORT || 3200;
var server = http.createServer(app);

var socketIo = require("./socket-io/socket");

socketIo(server);
server.listen(port, function () {
  console.log("server running on port number " + port);
});