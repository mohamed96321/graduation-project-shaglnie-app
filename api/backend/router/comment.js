const express = require("express");
const router = express.Router();
const comment = require("../controller/comment");
const { uploadFiles } = require("../middleware/upload");
const checkAuth = require("../middleware/check-auth");
router.get("/:postId", comment.getPostComment);
router.post(
  "/addComment/:postId",
  uploadFiles().array("commentImages", 10),
  checkAuth,
  comment.addComment
);
router.delete("/:commentId", checkAuth, comment.deleteComment);
module.exports = router;
