"use strict";

var mongoose = require("mongoose");

var ReviewSchema = mongoose.Schema({
  belongTo: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  reviewText: String
});
module.exports = mongoose.model("Review", ReviewSchema);