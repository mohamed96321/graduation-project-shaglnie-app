"use strict";

var express = require("express");

var router = express.Router();

var review = require("../controller/review");

var checkAuth = require("../middleware/check-auth");

router.get("/getReviews/:belongTo", review.getReview);
router.post("/addReview", checkAuth, review.addReview);
module.exports = router;