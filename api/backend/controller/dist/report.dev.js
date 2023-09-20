"use strict";

var Report = require("../model/report");

exports.getAllReports = function _callee(req, res, next) {
  var reports;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Report.find().populate({
            path: "creator",
            select: "_id userName profileImage"
          }));

        case 2:
          reports = _context.sent;
          res.status(200).json({
            reports: reports
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.addReport = function _callee2(req, res, next) {
  var _req$body, creator, reportMessage, reportTo, reportDate, newReport;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, creator = _req$body.creator, reportMessage = _req$body.reportMessage, reportTo = _req$body.reportTo;
          reportDate = new Date().toLocaleDateString();
          _context2.next = 4;
          return regeneratorRuntime.awrap(new Report({
            creator: creator,
            reportMessage: reportMessage,
            reportTo: reportTo,
            reportDate: reportDate
          }).save());

        case 4:
          newReport = _context2.sent;
          res.status(200).json({
            message: "report added",
            newReport: newReport
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.deleteReport = function _callee3(req, res, next) {
  var id, deletedReport;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log("delete report");
          id = req.params["id"];
          _context3.next = 4;
          return regeneratorRuntime.awrap(Report.findByIdAndDelete(id));

        case 4:
          deletedReport = _context3.sent;
          res.status(200).json({
            message: "report deleted",
            deletedReport: deletedReport
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};