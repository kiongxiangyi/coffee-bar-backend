const express = require("express");
const router = express.Router();
("use strict");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const Order = require("../models/Order");

router.post("/:id", async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    //get the email from the user of the order
    const user = await Order.findOne({ where: { ID: id } });
    const userEmail = await User.findOne({
      where: { Benutzer: user.AngelegtVon },
    });

    const output = `<p>Hallo ${user.AngelegtVon},</p>
    <p>Ihre Bestellung steht bereit.<p>
    <p>Vielen Dank.<p>
    <p>Mit freundlichen Grüßen<p>
    <p>Gühring AMB Kafeebar<p>`;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.guehring.de",
      port: 25,
      secure: false, // true for 465, false for other ports
      /* auth: {
        user: "", // generated user
        pass: "", // generated password
      }, */
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Gühring AMB Kaffeebar" <AMB_Kaffeebar@guehring.de>', // sender address
      to: userEmail.Email, // list of receivers
      subject: "Ihre Bestellung steht bereit", // Subject line
      html: output, // html body
    });

    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
