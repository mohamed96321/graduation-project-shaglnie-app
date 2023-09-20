const socketio = require("socket.io");
module.exports = (httpServer) => {
  // => TELL SOCKET IO TO RECIVE EVENTS
  const io = socketio(httpServer, {
    cors: {
      //FORM ONLY SERVER ON PORT 4200
      origin: "http://localhost:4200",
    },
  });
  // => ON USER CONNECT TO SERVER
  io.on("connection", (socket) => {
    //=> ON JOINING SPECIFIC ROOM
    socket.on("join", (joinPath, cb) => {
      // => PUSH THIS USER TO ROOM
      socket.join(joinPath);
      cb(joinPath);
    });
    // => WHEN ON_ADD_COMMENT EVENT FIRED FROM THE CLIENT SERVER
    socket.on("onAddComment", ({ newComment, joinPath }) => {
      // => PUBLISH THE NEW COMMENT TO ALL CONNECTED USER IN SPECIFIC ROOM
      console.log("++++++++++++++++");
      console.log("server push new comment");
      console.log("+++++++++++++++++");
      socket.broadcast
        .to(joinPath)
        .emit("onGetComment", { newComment, joinPath });
    });
    // => DELETE COMMENT
    socket.on("onDeleteComment", ({ commentId, joinPath }) => {
      socket.broadcast.to(joinPath).emit("onGetDeletedComment", commentId);
    });
    // => WHEN ON_ADD_POST EVENT FIRED FROM THE CLIENT SERVER
    socket.on("onAddPost", (post) => {
      // => THEN PUBLISH NEW JOB TO ALL CONNECTED USER IN ROOM 'allJobsRoom'
      socket.broadcast.to("allJobsRoom").emit("onGetPost", post);
    });
    //  => WHEN USER LEAVE ROOM
    socket.on("userOut", (joinPath) => {
      socket.leave(joinPath);
    });
    // => WHEN USER DELETE POSTS
    socket.on("onDeletePost", (postId) => {
      //=> THEN REMOVE THIS POST FROM ANOTHER USERS
      socket.broadcast.to("allJobsRoom").emit("onGetDeletedPostId", postId);
    });

    //=> WHEN USER LEAVE THE SERVER
    socket.on("disconnect", () => {
      io.emit("sendMessage", "user has been left !");
    });
  });
};
