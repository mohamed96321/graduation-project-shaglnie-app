const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  commentText: String,
  commentImages: Array,
  commentDate: String,
});
module.exports = mongoose.model("Comment", commentSchema);
