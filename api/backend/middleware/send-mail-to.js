const nodemailer = require("nodemailer");
module.exports = async (mail, message) => {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const options = {
    from: "fci@gmail.com",
    to: mail,
    text: message,
  };
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log("error :" + err);
    } else {
      console.log(info);
    }
  });
};
