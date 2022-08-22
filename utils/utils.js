const Order = require("../models/Order"); //order db
const User = require("../models/User"); //user db

// nodemailer
//("use strict");
const nodemailer = require("nodemailer");
const { DateTime } = require("luxon");

const deliverDrinks = async () => {
  try {
    const ordersToDeliver = await Order.findAll({
      attributes: [
        "ID",
        "Stueckliste",
        "Maschine",
        "Wechselstatus",
        "AngelegtVon",
        "AngelegtAm",
      ],
      where: { Wechselstatus: "WWS03" },
    });

    for await (const order of ordersToDeliver) {
      const user = await User.findOne({
        //select user where AngelegtVon in order db is same as Benutzer in user db
        where: { Pin: order.AngelegtVon },
      });
      console.log(JSON.stringify(user.Email));
      if (!user.Email) {
        await Order.update(
          { Wechselstatus: "WWS06" },
          {
            where: { Wechselstatus: "WWS03" },
          }
        );
      } else 
      {
        if (order.Maschine === "de") {
          const output = `<p>Guten Tag,</p>
        <p>Ihre Bestellung "${order.Stueckliste}" am 
        ${new Date(order.AngelegtAm).toLocaleString(
          "de-DE",
          DateTime.DATETIME_SHORT //Luxon DateTime
        )} 
        steht bereit.<p>
        <p>Vielen Dank für Ihre Bestellung und einen schönen Tag noch.<p>
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
        } else {
          const output = `<p>Hello,</p>
      <p>Your order "${order.Stueckliste}" at ${order.AngelegtAm} is ready.<p>
      <p>Thank you for your order and have a nice day.<p>
      <p>Best regards,<p>
      <p>Gühring AMB Coffee Bar<p>`;

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
            from: '"Gühring AMB Coffee Bar" <AMB_Coffee_Bar@guehring.de>', // sender address
            to: user.Email, // list of receivers
            subject: "Your Order is ready", // Subject line
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
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deliverDrinks;
