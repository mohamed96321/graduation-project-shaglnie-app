const Comment = require("../model/comment");
const Post = require("../model/post");
exports.addComment = async (decode, req, res, next) => {
  // GET POST ID TO ADD THIS COMMENT
  const postId = req.params["postId"];
  // GET CREATOR ID FORM RECIVED TOKEN
  const creator = decode.userId;
  const { commentText } = req.body;
  // HANDLE CODE IF USER SEND IAMGES
  let commentImages = [];
  if (req.files) {
    const url = `${req.protocol}://${req.get("host")}/uploads/`;
    commentImages = req.files.map((file) => {
      return url + file.filename;
    });
  }
  // SET COMMENT DATE
  const commentDate = new Date().toLocaleDateString();
  // SAVE COMMENT DATA INTO DB
  const newComment = await new Comment({
    creator,
    commentText,
    commentImages,
    commentDate,
  }).save();
  //GET OLD COMMENTS OF THAT POST
  const oldPost = await Post.findById(postId);
  const oldComments = oldPost.comments;
  let newComments = [];
  console.log(oldComments.length);
  // IF THAT POST DOES NOT HAVE COMMENTS
  if (oldComments.length == 0) {
    console.log("now comments yet");
    newComments = [newComment._id];
  }
  // ELSE THAT POST HASE COMMENTS
  else {
    newComments = oldComments;
    newComments.push(newComment._id);
  }
  // THEN ADD NEW COMMENT ID TO COMMENTS FIELD OF THAT POST
  const newPost = await Post.updateOne(
    { _id: postId },
    {
      $set: {
        comments: newComments,
      },
    }
  );
  res.status(200).json({
    message: "comment add",
    newComment,
  });
};
exports.getPostComment = async (req, res) => {
  const postId = req.params.postId;
  const postComment = await Comment.findById(postId);
  res.json({
    postComment,
  });
};
exports.deleteComment = async (decode, req, res, next) => {
  console.log("on delete comment");
  const commentId = req.params["commentId"];
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return;
  }
  if (decode.userId != comment["creator"]) {
    res.status(404).json({
      message: "your not allowed to delete that comment",
    });
  }
  await Comment.deleteOne({ _id: commentId });
  res.status(200).json({
    message: "comment deleted.",
  });
};
