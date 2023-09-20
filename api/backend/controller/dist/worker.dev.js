"use strict";

var User = require("../model/user");

exports.getAllAcceptedWrokers = function _callee(req, res, next) {
  var workers;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.find({
            job: {
              $exists: true
            },
            accepted: true
          }));

        case 2:
          workers = _context.sent;
          res.status(200).json({
            users: workers
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; //=>


exports.getAllWrokersReq = function _callee2(req, res, next) {
  var workers;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.find({
            job: {
              $exists: true
            },
            accepted: false
          }));

        case 2:
          workers = _context2.sent;
          res.status(200).json({
            users: workers
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // => GET WORKER BY JOB


exports.getWorkerByJob = function _callee3(req, res) {
  var job, workers;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          job = req.params["job"];
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.find({
            job: job
          }));

        case 3:
          workers = _context3.sent;
          res.status(200).json({
            workers: workers
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}; //ACCEPT WOKER FUNCTION


exports.acceptWorker = function _callee4(decode, req, res, next) {
  var userId, newUser;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log("accept worker ++++++++++++++");
          userId = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(userId, {
            $set: {
              accepted: true
            }
          }, {
            returnNewDocument: true,
            "new": true,
            strict: false
          }).select("-userPassword -__v"));

        case 4:
          newUser = _context4.sent;
          res.status(200).json({
            message: "successfully add  worker" //: newUser,

          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}; //BLOCK WORKER WOKER FUNCTION


exports.blockWorker = function _callee5(decode, req, res, next) {
  var userId, newUser;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          userId = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(userId, {
            $set: {
              accepted: false
            }
          }, {
            returnNewDocument: true,
            "new": true,
            strict: false
          }).select("-userPassword -__v"));

        case 3:
          newUser = _context5.sent;
          res.status(200).json({
            message: "successfully add  worker",
            newUser: newUser
          });

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
};