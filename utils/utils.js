const Order = require("../models/Order"); //order db
const User = require("../models/User"); //user db
// nodemailer
("use strict");
const nodemailer = require("nodemailer");

const deliverDrinks = async () => {
  try {
    const ordersToDeliver = await Order.findAll({
      attributes: [
        "ID",
        "Stueckliste",
        "Wechselstatus",
        "AngelegtVon",
        "AngelegtAm",
      ],
      where: { Wechselstatus: "WWS03" },
    });

    for await (const order of ordersToDeliver) {
      const user = await User.findOne({
        //select user where AngelegtVon in order db is same as Benutzer in user db
        where: { Benutzer: order.AngelegtVon },
      });

      const output = `<p>Hallo ${order.AngelegtVon},</p>
        <p>Ihre Bestellung "${order.Stueckliste}" am "${order.AngelegtAm}" steht bereit.<p>
        <p>Vielen Dank.<p>
        <p>Mit freundlichen Grüßen<p>
        <p>Gühring AMB Kafeebar<p>`;

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "mail.guehring.de",
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTPUSER, // generated user
          pass: process.env.SMTPPASSWORD, // generated password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Gühring AMB Kaffeebar" <AMB_Kaffeebar@guehring.de>', // sender address
        to: user.Email, // list of receivers
        subject: "Ihre Bestellung steht bereit", // Subject line
        html: output, // html body
      });

      //Update order status from finished to pickup
      await Order.update(
        { Wechselstatus: "WWS06" },
        {
          where: { Wechselstatus: "WWS03" },
        }
      );
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deliverDrinks;
