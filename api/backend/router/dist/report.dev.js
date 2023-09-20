"use strict";

var express = require("express");

var router = express.Router();

var report = require("../controller/report");

router.get("/", report.getAllReports);
router.post("/", report.addReport);
router["delete"]("/:id", report.deleteReport);
module.exports = router;