require("dotenv").config();
const { DateTime } = require("luxon");
const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const deliverDrinks = require("./utils/utils");
const refreshPickUpList = require("./utils/refreshPickUpList")

setInterval(deliverDrinks, 5000);
setInterval(refreshPickUpList, 2000);

const app = express();

//get the data and read them as json
app.use(express.json());

app.use(cors());

// Drinks route
app.use("/drinks", require("./routes/products"));
// Orders route
app.use("/orders", require("./routes/orders"));
// Users route
app.use("/users", require("./routes/users"));

// Error middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  return res.status(500).json({ error: err.message });
});

// Error
app.use("*", (req, res) => res.sendStatus(404)); // the server could not find what was requested

app.listen(PORT, console.log(`Server started on port ${PORT}`));
