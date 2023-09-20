"use strict";

var Review = require("../model/review");

exports.getReview = function _callee(req, res, next) {
  var belongTo, reviews;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          belongTo = req.params["belongTo"];
          console.log(belongTo);
          _context.next = 4;
          return regeneratorRuntime.awrap(Review.find({
            belongTo: belongTo
          }).populate({
            path: "creator",
            select: "_id profileImage userName"
          }));

        case 4:
          reviews = _context.sent;
          res.status(200).json({
            message: "site reviews",
            reviews: reviews
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.addReview = function _callee2(decode, req, res, next) {
  var _req$body, reviewText, belongTo, creator, newReview;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, reviewText = _req$body.reviewText, belongTo = _req$body.belongTo;
          creator = decode.userId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(new Review({
            creator: creator,
            reviewText: reviewText,
            belongTo: belongTo
          }).save());

        case 4:
          newReview = _context2.sent;
          res.status(200).json({
            message: "review added",
            newReview: newReview
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};