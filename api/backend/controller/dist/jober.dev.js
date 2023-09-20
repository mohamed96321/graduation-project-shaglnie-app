"use strict";

var Jober = require("../model/jober");

var bcrypt = require("bcrypt");

var Review = require("../model/review");

var jwt = require("jsonwebtoken");

exports.signup = function _callee(req, res, next) {
  var data, jober, hash, newJober, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          data = req.body;
          _context.next = 3;
          return regeneratorRuntime.awrap(Jober.findOne({
            email: data.email
          }));

        case 3:
          jober = _context.sent;

          if (jober) {
            _context.next = 14;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(bcrypt.hash(data.password, 10));

        case 7:
          hash = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(new Jober({
            fullName: data.fullName,
            email: data.email,
            password: hash,
            address: {
              bigCity: data.bigCity,
              city: data.city
            },
            job: data.job,
            accepted: false
          }).save());

        case 10:
          newJober = _context.sent;

          if (newJober) {
            token = jwt.sign({
              id: newJober._id,
              email: newJober.email,
              isUser: false,
              isJober: true
            }, process.env.JWT_SECRET_KEY);
            res.status(200).json({
              message: "jober successfully signup",
              token: token
            });
          } else {
            res.status(201).json({
              message: "something go wrong"
            });
          }

          _context.next = 15;
          break;

        case 14:
          res.status(201).json({
            message: "user existed."
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.signin = function _callee2(req, res, next) {
  var data, jober, resualt, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          data = req.body;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Jober.findOne({
            email: data.email
          }));

        case 3:
          jober = _context2.sent;

          if (!jober) {
            _context2.next = 8;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(data.password, jober.password));

        case 7:
          resualt = _context2.sent;

        case 8:
          if (!jober || !resualt) {
            res.status(201).json({
              message: "jober faild to signin."
            });
          } else if (!jober.accepted) {
            res.status(201).json({
              message: "jober doest accepted yet from admin"
            });
          } else if (jober.accepted && resualt) {
            token = jwt.sign({
              id: jober._id,
              email: jober.email,
              isUser: false,
              isJober: true
            }, process.env.JWT_SECRET_KEY);
            res.status(200).json({
              message: "jober successfully signin",
              token: token
            });
          } else {
            res.status(200).json({
              message: "something go wrong."
            });
          }

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.accept = function _callee3(req, res, next) {
  var jober;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Jober.findById(req.params.id));

        case 2:
          jober = _context3.sent;

          if (!jober) {
            _context3.next = 9;
            break;
          }

          _context3.next = 6;
          return regeneratorRuntime.awrap(Jober.updateOne({
            _id: req.params.id
          }, {
            $set: {
              accepted: true
            }
          }));

        case 6:
          res.status(200).json({
            message: "jober accepted"
          });
          _context3.next = 10;
          break;

        case 9:
          if (!jober) {
            res.status(201).json({
              message: "un existed jober to accept"
            });
          } else {
            res.status(201).json({
              message: "something go wrong."
            });
          }

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.deleteJober = function _callee4(req, res, next) {
  var resualt;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Jober.deleteOne({
            _id: req.params.id
          }));

        case 2:
          resualt = _context4.sent;

          if (resualt.deletedCount != 0) {
            res.status(200).json({
              message: "jober deleted"
            });
          } else if (resualt.deletedCount === 0) {
            res.status(201).json({
              message: "un existed jober to delete"
            });
          } else {
            res.status(404).json({
              message: "something go wrong."
            });
          }

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.review = function _callee5(req, res, next) {
  var id, data, jober, newReview, newReviews;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          data = req.body;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Jober.findById(id));

        case 4:
          jober = _context5.sent;
          newReview = new Review({
            fullName: data.fullName,
            message: data.message
          });

          if (!jober) {
            _context5.next = 25;
            break;
          }

          _context5.next = 9;
          return regeneratorRuntime.awrap(newReview.save());

        case 9:
          if (!(jober.reviews.length === 0)) {
            _context5.next = 15;
            break;
          }

          _context5.next = 12;
          return regeneratorRuntime.awrap(jober.update({
            $set: {
              reviews: [newReview._id]
            }
          }));

        case 12:
          res.status(200).json({
            message: "successfully review jober"
          });
          _context5.next = 25;
          break;

        case 15:
          if (!(jober.reviews.length > 0)) {
            _context5.next = 24;
            break;
          }

          newReviews = jober.reviews;
          newReviews.push(newReview._id);
          console.log(newReviews);
          _context5.next = 21;
          return regeneratorRuntime.awrap(Jober.updateOne({
            _id: id
          }, {
            $set: {
              reviews: newReviews
            }
          }));

        case 21:
          res.status(200).json({
            message: "successfully review jober"
          });
          _context5.next = 25;
          break;

        case 24:
          res.status(201).json({
            message: "something go wrong."
          });

        case 25:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.getJober = function _callee6(req, res, next) {
  var id, jober;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Jober.findById(id).populate("reviews").select("-password"));

        case 3:
          jober = _context6.sent;

          if (jober) {
            res.status(200).json({
              message: "successfully get jober ",
              jober: jober
            });
          } else {}

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.getAllJober = function _callee7(req, res, next) {
  var jobers;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Jober.find().populate("reviews").select("-password"));

        case 2:
          jobers = _context7.sent;

          if (jobers.length > 0) {
            res.status(200).json({
              message: "successfully get all jober ",
              jobersCount: jobers.length,
              jobers: jobers
            });
          } else {
            res.status(200).json({
              message: "no existed jober yet"
            });
          }

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.edit = function _callee8(req, res, next) {
  var id, data, jober;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          data = req.body;
          _context8.next = 4;
          return regeneratorRuntime.awrap(Jober.findById(id));

        case 4:
          jober = _context8.sent;

          if (!jober) {
            _context8.next = 11;
            break;
          }

          _context8.next = 8;
          return regeneratorRuntime.awrap(Jober.updateOne({
            _id: id
          }, data));

        case 8:
          res.status(200).json({
            message: "successfully edit jober"
          });
          _context8.next = 12;
          break;

        case 11:
          res.status(201).json({
            message: "something go wrong"
          });

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.acceptedJober = function _callee9(req, res, next) {
  var jobers;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(Jober.find({
            accepted: true
          }));

        case 2:
          jobers = _context9.sent;

          if (jobers.length > 0) {
            res.status(200).json({
              message: "successfully get accepted jobers",
              jobers: jobers
            });
          } else {
            res.status(201).json({
              message: "no  accepted jobers"
            });
          }

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
};

exports.notAcceptedJober = function _callee10(req, res, next) {
  var jobers;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(Jober.find({
            accepted: !true
          }));

        case 2:
          jobers = _context10.sent;

          if (jobers.length > 0) {
            res.status(200).json({
              message: "successfully get not accepted jobers",
              jobers: jobers
            });
          } else {
            res.status(201).json({
              message: "no un accepted jobers"
            });
          }

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
};