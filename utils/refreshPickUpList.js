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

    const insertFinishedDate = async () => {
      for await (const order of ordersToPickUp) {
        let date = new Date();
        if (order.ErledigtAm === null && order.Wechselstatus === "WWS06") {
          order.ErledigtAm = date;
          await order.save();
          //await order.save();
          /* await Order.update(
            {
              ErledigtAm: date,
            },
            {
              where: { Wechselstatus: "WWS06" },
            }
          ); */
        }
        console.log(order.ErledigtAm);
      }
    };
    const pickedUp = async () => {
      for await (const order of ordersToPickUp) {
        let end = new Date().getTime();
        let start = new Date(order.ErledigtAm).getTime();
        let time = end - start;
        console.log(end);
        console.log(start);
        console.log(end - start);
        if (time > 60000) {
          await Order.update(
            { Wechselstatus: "WWS05" },
            {
              where: { Wechselstatus: "WWS06" },
            }
          );
        }
      }
    };

    await insertFinishedDate();
    await pickedUp();
  } catch (error) {
    //res.status(500).json({ error: error.message });
    console.log(error);
  }
};

module.exports = refreshPickUpList;
