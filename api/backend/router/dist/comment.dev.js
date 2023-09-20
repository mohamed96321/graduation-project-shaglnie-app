"use strict";

var express = require("express");

var router = express.Router();

var comment = require("../controller/comment");

var _require = require("../middleware/upload"),
    uploadFiles = _require.uploadFiles;

var checkAuth = require("../middleware/check-auth");

router.get("/:postId", comment.getPostComment);
router.post("/addComment/:postId", uploadFiles().array("commentImages", 10), checkAuth, comment.addComment);
router["delete"]("/:commentId", checkAuth, comment.deleteComment);
module.exports = router;