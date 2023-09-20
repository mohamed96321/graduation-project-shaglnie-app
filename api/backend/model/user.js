/**
 * USER SCHEMA DEFINATION
 */
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  profileImage: String,
  userName: String,
  userEmail: String,
  userPhone: String,
  userBigCity: String,
  userCity: String,
  userPassword: String,
});
module.exports = mongoose.model("User", userSchema);
