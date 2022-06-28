const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const app = express();

//get the data and read them as json
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => res.send("INDEX"));

// Drinks route
app.use("/drinks", require("./routes/products"));

// Users route
app.use("/users", require("./routes/users"));

// Orders route
app.use("/orders", require("./routes/orders"));

// Error
app.use("*", (req, res) => res.sendStatus(404)); // the server could not find what was requested

app.listen(PORT, console.log(`Server started on port ${PORT}`));
