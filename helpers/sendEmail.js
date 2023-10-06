const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_USER,  EMAIL_PASS, EMAIL_SENDER} = process.env;


const nodemailerConfig = {
  host: "s3.thehost.com.ua",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
};

const transport = nodemailer.createTransport(nodemailerConfig);


function sendEmail(message) {
  message['from'] = EMAIL_SENDER;

  return transport.sendMail(message);
}

module.exports = sendEmail;
