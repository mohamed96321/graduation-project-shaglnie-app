"use strict";

var express = require("express");

var checkAuth = require("../middleware/check-auth");

var post = require("../controller/post");

var _require = require("../middleware/upload"),
    uploadFiles = _require.uploadFiles;

var router = express.Router(); // GET ALL POSTS

router.get("/", post.getAllPosts); // GET SPECIFIC POST BY ID

router.get("/:postId", post.getPostById); // ADD NEW POST

router.post("/addPost", uploadFiles().array("postImages", 5), checkAuth, post.addPost); // => DELETE SPECIFIC POST BY ID

router["delete"]("/:postId", checkAuth, post.deletePost); // => GET POST FOR SPECIFIC USER

router.get("/userPosts", checkAuth, post.userPosts);
module.exports = router;