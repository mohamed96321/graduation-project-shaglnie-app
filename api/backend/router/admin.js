const express = require("express");
const router = express.Router();
const admin = require("../controller/admin");
router.get("/statistic", admin.statistic);
module.exports = router;
