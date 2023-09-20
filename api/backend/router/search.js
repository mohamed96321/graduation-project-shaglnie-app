const express = require("express");
const router = express.Router();
const search = require("../controller/search");
router.get("/:job/:bigCity/:city/:isWorker", search.search);
module.exports = router;
