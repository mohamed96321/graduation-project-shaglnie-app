const express = require("express");
const router = express.Router();
const report = require("../controller/report");
router.get("/", report.getAllReports);
router.post("/", report.addReport);
router.delete("/:id", report.deleteReport);

module.exports = router;
