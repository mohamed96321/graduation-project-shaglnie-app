"use strict";

var express = require("express");

var user = require("../controller/user");

var checkAuth = require("../middleware/check-auth");

var _require = require("../middleware/upload"),
    uploadFiles = _require.uploadFiles;

var router = express.Router(); // => GET ALL USERS

router.get("/", user.getAllUsers); // => GET ALL ONLY USER WITHOUT WORKERS

router.get("/users", user.getUsers); // => USER SIGNUP REQUEST

router.post("/signup", uploadFiles().array("workerIdentityImages"), user.signup); // => USER SINGIN REQUEST

router.post("/signin", user.signin);
router.patch("/admin/:id", user.addAdmin); // => GET SPECIFIC USER BY ID

router.get("/:id", user.getUser); // => UPDATE SPECIFIC USER BY ID

router.patch("/:id", uploadFiles().single("profileImage"), checkAuth, user.edit); // DELETE SPECIFIC USER BY ID

router["delete"]("/:id", checkAuth, user.deleteUser);
module.exports = router;