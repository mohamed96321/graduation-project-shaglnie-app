const http = require("http");
const app = require("./backend/app");
const port = process.env.PORT || 3200;
const server = http.createServer(app);
const socketIo = require("./socket-io/socket");
socketIo(server);
server.listen(port, () => {
  console.log("server running on port number " + port);
});
