const express = require("express");
const router = express.Router();
const Email = require("../models/Email");
("use strict");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  try {
    const output = `<p>Hello</p>`;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.guehring.de",
      port: 25,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "", // generated user
        pass: "", // generated password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Gühring AMB Kaffeebar" <kaffeebar@guehring.de>', // sender address
      to: "xiangyi.kiong@guehring.de", // list of receivers
      subject: "Ihr Kaffee steht bereit", // Subject line
      text: "Bitte ihr Kaffee abholen", // plain text body
      html: output, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
