"use strict";

var express = require("express");

var jober = require("../controller/jober");

var router = express.Router();
router.post("/signup", jober.signup);
router.post("/signin", jober.signin);
router.patch("/accept/:id", jober.accept);
router["delete"]("/:id", jober.deleteJober);
router.post("/review/:id", jober.review);
router.get("/acceptedJober", jober.acceptedJober);
router.get("/notAcceptedJober", jober.notAcceptedJober);
router.get("/:id", jober.getJober);
router.get("/", jober.getAllJober);
router.patch("/edit/:id", jober.edit);
module.exports = router;