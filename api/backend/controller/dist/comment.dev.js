"use strict";

var Comment = require("../model/comment");

var Post = require("../model/post");

exports.addComment = function _callee(decode, req, res, next) {
  var postId, creator, commentText, commentImages, url, commentDate, newComment, oldPost, oldComments, newComments, newPost;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // GET POST ID TO ADD THIS COMMENT
          postId = req.params["postId"]; // GET CREATOR ID FORM RECIVED TOKEN

          creator = decode.userId;
          commentText = req.body.commentText; // HANDLE CODE IF USER SEND IAMGES

          commentImages = [];

          if (req.files) {
            url = "".concat(req.protocol, "://").concat(req.get("host"), "/uploads/");
            commentImages = req.files.map(function (file) {
              return url + file.filename;
            });
          } // SET COMMENT DATE


          commentDate = new Date().toLocaleDateString(); // SAVE COMMENT DATA INTO DB

          _context.next = 8;
          return regeneratorRuntime.awrap(new Comment({
            creator: creator,
            commentText: commentText,
            commentImages: commentImages,
            commentDate: commentDate
          }).save());

        case 8:
          newComment = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(Post.findById(postId));

        case 11:
          oldPost = _context.sent;
          oldComments = oldPost.comments;
          newComments = [];
          console.log(oldComments.length); // IF THAT POST DOES NOT HAVE COMMENTS

          if (oldComments.length == 0) {
            console.log("now comments yet");
            newComments = [newComment._id];
          } // ELSE THAT POST HASE COMMENTS
          else {
              newComments = oldComments;
              newComments.push(newComment._id);
            } // THEN ADD NEW COMMENT ID TO COMMENTS FIELD OF THAT POST


          _context.next = 18;
          return regeneratorRuntime.awrap(Post.updateOne({
            _id: postId
          }, {
            $set: {
              comments: newComments
            }
          }));

        case 18:
          newPost = _context.sent;
          res.status(200).json({
            message: "comment add",
            newComment: newComment
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getPostComment = function _callee2(req, res) {
  var postId, postComment;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          postId = req.params.postId;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Comment.findById(postId));

        case 3:
          postComment = _context2.sent;
          res.json({
            postComment: postComment
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.deleteComment = function _callee3(decode, req, res, next) {
  var commentId, comment;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log("on delete comment");
          commentId = req.params["commentId"];
          _context3.next = 4;
          return regeneratorRuntime.awrap(Comment.findById(commentId));

        case 4:
          comment = _context3.sent;

          if (comment) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return");

        case 7:
          if (decode.userId != comment["creator"]) {
            res.status(404).json({
              message: "your not allowed to delete that comment"
            });
          }

          _context3.next = 10;
          return regeneratorRuntime.awrap(Comment.deleteOne({
            _id: commentId
          }));

        case 10:
          res.status(200).json({
            message: "comment deleted."
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
};