"use strict";

var nodemailer = require("nodemailer");

module.exports = function _callee(mail, message) {
  var testAccount, transporter, options;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(nodemailer.createTestAccount());

        case 2:
          testAccount = _context.sent;
          // create reusable transporter object using the default SMTP transport
          transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
              user: testAccount.user,
              // generated ethereal user
              pass: testAccount.pass // generated ethereal password

            },
            tls: {
              rejectUnauthorized: false
            }
          });
          options = {
            from: "fci@gmail.com",
            to: mail,
            text: message
          };
          transporter.sendMail(options, function (err, info) {
            if (err) {
              console.log("error :" + err);
            } else {
              console.log(info);
            }
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};