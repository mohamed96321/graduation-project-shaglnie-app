const mongoose = require("mongoose");
const ReviewSchema = mongoose.Schema({
  belongTo: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviewText: String,
});
module.exports = mongoose.model("Review", ReviewSchema);
