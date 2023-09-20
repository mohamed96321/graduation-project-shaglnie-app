"use strict";

var express = require("express");

var checkAuth = require("../middleware/check-auth");

var worker = require("../controller/worker");

var router = express.Router(); // GET ALL WORKERS

router.get("/", worker.getAllAcceptedWrokers);
router.get("/workerReq", worker.getAllWrokersReq); // GET WORKER BY HIS JOB

router.get("/:job", worker.getWorkerByJob); // ACCEPT WORKER

router.patch("/acceptWorker/:id", checkAuth, worker.acceptWorker); // BLOCK BLOCK WORKER

router.patch("/blockWorker/:id", checkAuth, worker.blockWorker);
module.exports = router;