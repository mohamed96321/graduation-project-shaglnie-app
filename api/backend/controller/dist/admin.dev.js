"use strict";

var User = require("../model/user");

var Post = require("../model/post");

var Report = require("../model/report");

var Comment = require("../model/comment");

exports.statistic = function _callee(req, res, next) {
  var userCount, postCount, reportCount, commentCount;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.countDocuments());

        case 2:
          userCount = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(Post.countDocuments());

        case 5:
          postCount = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(Report.countDocuments());

        case 8:
          reportCount = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(Comment.countDocuments());

        case 11:
          commentCount = _context.sent;
          res.status(200).json({
            userCount: userCount,
            postCount: postCount,
            reportCount: reportCount,
            commentCount: commentCount
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
};