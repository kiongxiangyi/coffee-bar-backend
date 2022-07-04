const { request } = require("express");
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const results = await Order.findAll({
      attributes: [
        "ID",
        "Stueckliste",
        "Menge",
        "Wechselstatus",
        "AngelegtVon",
        "AngelegtAm",
        "ErledigtAm",
      ],
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      body: { user, orderItems },
    } = req;
    if (!user) return next(new Error("Bitte Namen eingeben")); //check user input
    if (!orderItems.length)
      return next(new Error("Please select at least 1 drink")); //check coffee selection input
    //check if user is in database registered
    const foundUser = await User.findOne({
      where: { Benutzer: user },
    });
    if (!foundUser) next(new Error("Please register your name first"));

    //Create first ID if no data records
    const { count } = await Order.findAndCountAll({
      where: {
        ID: 1,
      },
    });

    if (count === 0) {
      //if no number records of id 1
      const orders = await Order.bulkCreate(
        orderItems.map((order, i) => ({
          ID: i + 1,
          Stueckliste: order.Stueckliste,
          Menge: order.qty,
          Wechselstatus: "WWS01",
          AngelegtVon: user,
          Stuecklistenvariante: "",
          Bauteil: "",
          Bauteilvariante: "",
          Operation: "",
          Maschine: "",
          Spindel: "",
          Auftragsnummer: "",
          Wechselgrund: "",
          Restwert: 0,
          ErledigtVon: "",
          VerschleissID: 0,
          Vermessen: false,
          Neu: false,
          Werkzeug: false,
          Bemerkung: "",
        }))
      );
      res.json(orders);
    } else {
      //if id 1 exists, find last ID
      const { ID } = await Order.findOne({
        limit: 1,
        order: [["ID", "DESC"]],
      });
      const orders = await Order.bulkCreate(
        orderItems.map((order, i) => ({
          ID: ID + 1 + i,
          Stueckliste: order.Stueckliste,
          Menge: order.qty,
          Wechselstatus: "WWS01",
          AngelegtVon: user,
          Stuecklistenvariante: "",
          Bauteil: "",
          Bauteilvariante: "",
          Operation: "",
          Maschine: "",
          Spindel: "",
          Auftragsnummer: "",
          Wechselgrund: "",
          Restwert: 0,
          ErledigtVon: "",
          VerschleissID: 0,
          Vermessen: false,
          Neu: false,
          Werkzeug: false,
          Bemerkung: "",
        }))
      );
      res.json(orders);
    }
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {
      params: { id },
      body: { status },
    } = req;

    const [updateOrder] = await Order.update(
      //why array updateOrder to work?
      {
        Wechselstatus: status,
      },
      {
        where: {
          ID: id,
        },
      }
    );
    const result = await Order.findOne({ where: { ID: id } });
    res.json(
      updateOrder
        ? result
        : {
            error: `Order with id of ${id} doesn't exist. No rows affected`,
          }
    );
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const deleteOrder = await Order.destroy({
      where: {
        ID: id,
      },
    });
    res.json(
      deleteOrder
        ? { success: `Order with id of ${id} was deleted` }
        : {
            error: `Order with id of ${id} doesn't exist. No rows affected`,
          }
    );
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
