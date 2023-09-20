const User = require("../model/user");
const Post = require("../model/post");
const Report = require("../model/report");
const Comment = require("../model/comment");

exports.statistic = async (req, res, next) => {
  const userCount = await User.countDocuments();
  const postCount = await Post.countDocuments();
  const reportCount = await Report.countDocuments();
  const commentCount = await Comment.countDocuments();
  res.status(200).json({
    userCount,
    postCount,
    reportCount,
    commentCount,
  });
};
