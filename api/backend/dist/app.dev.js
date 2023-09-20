"use strict";

// START REQUIRED MODULES
require("dotenv").config();

var express = require("express");

var mongoose = require("mongoose");

var morgan = require("morgan");

var path = require("path"); // END REQUIRED MODULES
// START API ROUTES


var userRoutes = require("./router/user");

var workerRoutes = require("./router/worker");

var postRoutes = require("./router/post");

var reviewRoutes = require("./router/review");

var commentRoutes = require("./router/comment");

var searchRoutes = require("./router/search");

var reportRoutes = require("./router/report");

var adminRoutes = require("./router/admin"); // END API ROUTES


var app = express(); // => GET INFO ABOUT THE RECIVIED REQUEST (URL , STATUS)

app.use(morgan("dev")); // => CONNECTING TO DATA BASE

mongoose.connect(process.env.MONGO_DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}) // => ON SUCCESS
.then(function () {
  console.log("connected to database at url  " + process.env.MONGO_DB_URL);
})["catch"](function (err) {
  console.log("database connection error : " + err.message);
}) // => ON FAILUER
["catch"](function () {
  console.log("Connection to db failed!");
}); // => TO READ AND RECIVE DATA FROM REQUEST BODY

app.use(express.json());
app.use(express.urlencoded({
  extended: true
})); // => MAKE FOLDER UPLOADS STATIC TO ACCESS IMAGES FROM IT

app.use("/uploads", express["static"](path.join(__dirname + "/uploads"))); // => ENABLE CORS (CROSS ORIGIN RESOURCE SHARING)

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
}); // => ALL API ROUTES

app.use("/api/user", userRoutes);
app.use("/api/worker", workerRoutes);
app.use("/api/post", postRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/admin", adminRoutes);
module.exports = app; ////////////////////////////////////////////////////

/**
 * MRC
 * MODEL ROUTES CONTROL
 */
///////////////////////////////////////////////////