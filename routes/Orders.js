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
        "Bemerkung", //table
        "Maschine", //language
        "Auftragsnummer", //Bestellnummer
        "Operation", //right or left coffee maker position ->"r" or "l"
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
      body: { user, orderItems, table, locale },
    } = req;
    /* if (!user) return next(new Error("Bitte PIN eingeben")); //check user input
    if (!orderItems.length) return next(new Error("Bitte Produkte auswählen")); //check coffee selection input
    //check if user is in database registered
    const foundUser = await User.findOne({
      where: { Pin: user },
    });
    //console.log(user)
    if (!foundUser)
      next(
        new Error(
          "Ihre PIN ist nicht gültig. Bitte am Gühring Stand registrieren."
        )
      );  */

    //Find if there is ID 1 -> purpose: create first ID if no data records later
    const { count } = await Order.findAndCountAll({
      where: {
        ID: 1,
      },
    });

    //initial ID and order number
    let validatedID = 0;
    let validatedAuftragsnummer = 100001;

    //if ID exists
    if (count > 0) {
      //find last ID
      const { ID } = await Order.findOne({
        limit: 1,
        order: [["ID", "DESC"]],
      });
      validatedID = ID; //replace initial ID
      //find last order number
      const { Auftragsnummer } = await Order.findOne({
        limit: 1,
        order: [["Auftragsnummer", "DESC"]],
      });
      validatedAuftragsnummer = Auftragsnummer; //replace initial order number
      validatedAuftragsnummer++; //increase order number by 1 for next order
      
    }
    const orderItemsQty1 = []; //new array for orders only with qty 1
    orderItems.forEach((item) => {
      //loop according to qty and create new array for each order with qty 1
      for (let i = 0; i < item.qty; i++) {
        const newItem = {
          ID: item.ID,
          Stueckliste: item.Stueckliste,
          Dokument1: item.Bemerkung,
          qty: 1,
          Bestellnummer: validatedAuftragsnummer,
        };
        
        orderItemsQty1.push(newItem);
      }
    });

    //if no number records of id 1
    const orders = await Order.bulkCreate(
      orderItemsQty1.map((order) => ({
        ID: ++validatedID, //increase the ID first and return
        Stueckliste: order.Stueckliste,
        Menge: 1,
        Wechselstatus: "WWS01",
        AngelegtVon: user,
        Stuecklistenvariante: "",
        Bauteil: "",
        Bauteilvariante: "",
        Operation: "",
        Maschine: locale,
        Spindel: "",
        Auftragsnummer: order.Bestellnummer,
        Wechselgrund: "",
        Restwert: 0,
        ErledigtVon: "",
        VerschleissID: 0,
        Vermessen: false,
        Neu: false,
        Werkzeug: false,
        Bemerkung: table,
      }))
    );
    res.json(orders);

    /* else {
    
      const orders = await Order.bulkCreate(
        orderItemsQty1.map((order, i) => ({
          ID: ID + i + 1,
          Stueckliste: order.Stueckliste,
          Menge: 1,
          Wechselstatus: "WWS01",
          AngelegtVon: user,
          Stuecklistenvariante: "",
          Bauteil: "",
          Bauteilvariante: "",
          Operation: "",
          Maschine: locale,
          Spindel: "",
          Auftragsnummer: order.Bestellnummer,
          Wechselgrund: "",
          Restwert: 0,
          ErledigtVon: "",
          VerschleissID: 0,
          Vermessen: false,
          Neu: false,
          Werkzeug: false,
          Bemerkung: table,
        }))
      );
      res.json(orders);
    } */

    /* if (count === 0) {
      //if no number records of id 1
      const orders = await Order.bulkCreate(
        orderItems.map((order, i) => ({
          ID: 1,
          Stueckliste: order.Stueckliste,
          Menge: 1,
          Wechselstatus: "WWS01",
          AngelegtVon: user,
          Stuecklistenvariante: "",
          Bauteil: "",
          Bauteilvariante: "",
          Operation: "",
          Maschine: locale,
          Spindel: "",
          Auftragsnummer: 100001,
          Wechselgrund: "",
          Restwert: 0,
          ErledigtVon: "",
          VerschleissID: 0,
          Vermessen: false,
          Neu: false,
          Werkzeug: false,
          Bemerkung: table,
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
          ID: ID + i + 1,
          Stueckliste: order.Stueckliste,
          Menge: 1,
          Wechselstatus: "WWS01",
          AngelegtVon: user,
          Stuecklistenvariante: "",
          Bauteil: "",
          Bauteilvariante: "",
          Operation: "",
          Maschine: locale,
          Spindel: "",
          Auftragsnummer: ID + i + 100001,
          Wechselgrund: "",
          Restwert: 0,
          ErledigtVon: "",
          VerschleissID: 0,
          Vermessen: false,
          Neu: false,
          Werkzeug: false,
          Bemerkung: table,
        }))
      );
      res.json(orders);
    } */
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {
      params: { id },
      body: { status, coffeeMakerDirection },
    } = req;

    const [updateOrder] = await Order.update(
      //why array updateOrder to work?
      {
        Wechselstatus: status,
        Operation: coffeeMakerDirection,
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
