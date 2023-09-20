"use strict";

var express = require("express");

var router = express.Router();

var admin = require("../controller/admin");

router.get("/statistic", admin.statistic);
module.exports = router;