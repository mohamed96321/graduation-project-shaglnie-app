"use strict";

var jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    var token = req.headers.authorization.split(" ")[1];
    var decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next(decode);
  } catch (error) {
    res.status(401).json({
      message: "auth faild",
      error: error.message
    });
  }
};