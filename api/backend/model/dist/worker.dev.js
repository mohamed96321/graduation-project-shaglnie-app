"use strict";

var mongoose = require("mongoose");

var workerSchema = mongoose.Schema({
  fullName: String,
  email: String,
  image: String,
  password: String,
  phone: String,
  address: {
    bigCity: String,
    city: String
  },
  job: String,
  accepted: {
    type: Boolean,
    defualt: false
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }],
  images: Array
});
module.exports = mongoose.model("Worker", workerSchema);