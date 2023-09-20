const express = require("express");
const router = express.Router();
const review = require("../controller/review");
const checkAuth = require("../middleware/check-auth");
router.get("/getReviews/:belongTo", review.getReview);
router.post("/addReview", checkAuth, review.addReview);
module.exports = router;
