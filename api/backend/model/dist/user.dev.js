"use strict";

/**
 * USER SCHEMA DEFINATION
 */
var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  profileImage: String,
  userName: String,
  userEmail: String,
  userPhone: String,
  userBigCity: String,
  userCity: String,
  userPassword: String
});
module.exports = mongoose.model("User", userSchema);