const Order = require("../models/Order"); //order db
const { DateTime } = require("luxon");

const refreshPickUpList = async () => {
  try {
    const ordersToPickUp = await Order.findAll({
      attributes: [
        "ID",
        "Stueckliste",
        "Maschine",
        "Wechselstatus",
        "AngelegtVon",
        "AngelegtAm",
        "ErledigtAm",
      ],
      where: { Wechselstatus: "WWS06" },
    });

    for await (const order of ordersToPickUp) {
      if (order.ErledigtAm === null) {
        await Order.update(
          {
            ErledigtAm: new Date(), //Luxon DateTime
          },
          {
            where: { Wechselstatus: "WWS06" },
          }
        );
      }
      console.log(order.ErledigtAm);
    }

    for await (const order of ordersToPickUp) {
      let end = new Date().getTime();
      let start = new Date(order.ErledigtAm).getTime();
      console.log(end);
      console.log(start);
      console.log(end - start);
      if (end - start > 60000) {
        await Order.update(
          { Wechselstatus: "WWS05" },
          {
            where: { Wechselstatus: "WWS06" },
          }
        );
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = refreshPickUpList;
