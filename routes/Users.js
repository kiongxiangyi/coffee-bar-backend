const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const results = await User.findAll({
      attributes: ["ID", "Benutzer", "Email", "Pin"],
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      body: { firstName, lastName, email, hash },
    } = req;
    const { ID } = await User.findOne({
      limit: 1,
      order: [["ID", "DESC"]],
    });
    const users = await User.create({
      ID: ID + 1,
      Benutzer: firstName + " " + lastName,
      ActiveDirectoryName: "",
      Personalnummer: "",
      Abteilung: "",
      Kostenstelle: "",
      Sprache: "DE",
      Passwort: "",
      Pin: hash,
      SchnittstelleBenutzer: "",
      Partnernummer: "",
      Email: email,
      Benutzergruppe: "Rückgeber",
      Startbildschirm: "",
      Hauptmaschine: "",
      Stundensatz: 0.00,
      Aktiv: true,
      Zeiterfassung: false,
      Arbeitszeit: 0.00,
      Arbeitszeitcode: "",
      Wochenarbeitstage: 0,
      Schichtplan: "",
      Urlaubstage: 0,
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
