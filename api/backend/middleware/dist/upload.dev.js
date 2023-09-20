"use strict";

var multer = require("multer");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "backend/uploads/");
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname.toLocaleLowerCase().split(" ").join("-") + Date.now() + file.originalname);
  }
});

exports.uploadFiles = function () {
  return multer({
    storage: storage
  });
};