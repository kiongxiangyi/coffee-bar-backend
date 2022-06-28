const { request } = require("express");
const express = require("express");
const { DateTime, DateTime2 } = require("mssql");
const { DATE } = require("sequelize");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { Benutzer: req.body.user },
    });
    if (!user) throw Error("User does not exist");
    const { ID } = await Order.findOne({
      limit: 1,
      order: [["ID", "DESC"]],
    });
    const order = await Order.create({
      ID: ID + 1,
      Stueckliste: req.body.stueckliste,
      Menge: req.body.qty,
      Wechselstatus: req.body.status,
      Bemerkung: req.body.name,
      Stuecklistenvariante: "test",
      Bauteil: "null",
      Bauteilvariante: "null",
      Operation: "test",
      Maschine: "test",
      Spindel: "test",
      Auftragsnummer: "test",
      Wechselgrund: "test",
      Restwert: 0,
      AngelegtVon: "test",
      ErledigtVon: "test",
      VerschleissID: 0,
      Vermessen: false,
      Neu: false,
      Werkzeug: false,
    });
    res.json(order);
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateOrder = await Order.update(
      {
        Wechselstatus: req.body.statusNew,
      },
      {
        where: {
          ID: req.params.id,
          Stueckliste: req.body.stueckliste,
          Menge: req.body.qty,
          Wechselstatus: req.body.status,
          Bemerkung: req.body.name,
        },
      }
    );
    console.log(updateOrder);
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteOrder = await Order.destroy({
      where: {
        ID: req.params.id,
      },
    });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await Order.findAll({
      attributes: ["ID", "Stueckliste", "Menge", "Wechselstatus", "Bemerkung"],
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
