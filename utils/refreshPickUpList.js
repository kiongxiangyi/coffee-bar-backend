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

    //update finished date when status is ready for pickup WWS06
    const insertFinishedDate = async () => {
      for await (const order of ordersToPickUp) {
        let dateNow = new Date();
        if (order.ErledigtAm === null && order.Wechselstatus === "WWS06") {
          order.ErledigtAm = dateNow; //update the value
          await order.save(); //save to database
        }
      }
    };

    //after specific time, the pickup orders will change status and disappear on monitor
    const pickedUp = async () => {
      for await (const order of ordersToPickUp) {
        let liveTime = new Date().getTime();
        let pickupTime = new Date(order.ErledigtAm).getTime();
        let timeDiff = liveTime - pickupTime;
        if (timeDiff > 60000) { //time in ms
          order.Wechselstatus = "WWS05"; //update status
          await order.save(); //save to database
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
