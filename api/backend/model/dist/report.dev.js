"use strict";

var mongoose = require("mongoose");

var reportSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  reportMessage: String,
  reportTo: String,
  reportDate: String
});
module.exports = mongoose.model("Report", reportSchema);