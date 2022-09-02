const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const results = await Product.findAll({
      attributes: ["ID", "Stueckliste", "Stuecklistentyp", "Bemerkung"],
      where: {
        Stuecklistentyp: "Kaffeemaschine",
      },
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
