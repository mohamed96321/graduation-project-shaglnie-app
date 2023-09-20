"use strict";

var User = require("../model/user");

var Post = require("../model/post");

exports.search = function _callee(req, res, next) {
  var _req$params, job, bigCity, city, isWorker, worker, posts, users;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("search works !");
          _req$params = req.params, job = _req$params.job, bigCity = _req$params.bigCity, city = _req$params.city, isWorker = _req$params.isWorker;
          worker = isWorker == "true" ? true : false;
          console.log(worker);
          _context.next = 6;
          return regeneratorRuntime.awrap(Post.find({
            job: {
              $regex: ".*" + job.slice(0, 4) + ".*"
            },
            creatorBigCity: {
              $regex: ".*" + bigCity.slice(0, 4) + ".*"
            },
            creatorCity: {
              $regex: ".*" + city.slice(0, 4) + ".*"
            },
            createByWorker: !worker
          }).populate({
            path: "creator",
            select: "_id profileImage userName"
          }).populate({
            path: "comments",
            populate: {
              path: "creator",
              select: "_id profileImage userName"
            }
          }));

        case 6:
          posts = _context.sent;

          if (worker) {
            _context.next = 13;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(User.find({
            job: {
              $regex: ".*" + job.slice(0, 4) + ".*"
            },
            userBigCity: {
              $regex: ".*" + bigCity.slice(0, 4) + ".*"
            },
            userCity: {
              $regex: ".*" + city.slice(0, 4) + ".*"
            },
            accepted: true
          }).select("userName profileImage userPhone userCity userBigCity"));

        case 10:
          _context.t0 = _context.sent;
          _context.next = 14;
          break;

        case 13:
          _context.t0 = [];

        case 14:
          users = _context.t0;
          console.log(users);
          res.status(200).json({
            message: "get posts",
            posts: posts,
            users: users
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
};