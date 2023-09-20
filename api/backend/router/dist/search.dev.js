"use strict";

var express = require("express");

var router = express.Router();

var search = require("../controller/search");

router.get("/:job/:bigCity/:city/:isWorker", search.search);
module.exports = router;