const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    ID: { type: Sequelize.INTEGER, primaryKey: true },
    Benutzer: { type: Sequelize.STRING },
    ActiveDirectoryName: { type: Sequelize.STRING },
    Personalnummer: { type: Sequelize.STRING },
    Abteilung: { type: Sequelize.STRING },
    Kostenstelle: { type: Sequelize.STRING },
    Sprache: { type: Sequelize.STRING },
    Passwort: { type: Sequelize.STRING },
    Pin: { type: Sequelize.STRING },
    SchnittstelleBenutzer: { type: Sequelize.STRING },
    Partnernummer: { type: Sequelize.STRING },
    Email: { type: Sequelize.STRING },
    Benutzergruppe: { type: Sequelize.STRING },
    Startbildschirm: { type: Sequelize.STRING },
    Hauptmaschine: { type: Sequelize.STRING },
    Stundensatz: { type: Sequelize.DECIMAL },
    Aktiv: { type: Sequelize.BOOLEAN },
    Zeiterfassung: { type: Sequelize.BOOLEAN },
    Arbeitszeit: { type: Sequelize.DECIMAL },
    Arbeitszeitcode: { type: Sequelize.STRING },
    Wochenarbeitstage: { type: Sequelize.INTEGER },
    Schichtplan: { type: Sequelize.STRING },
    Urlaubstage: { type: Sequelize.INTEGER },
  },
  {
    tableName: "tblBenutzer",
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = User;
/* 
Column_name	Type
ID	int
Benutzer	nvarchar
ActiveDirectoryName	nvarchar
Personalnummer	nvarchar
Abteilung	nvarchar
Kostenstelle	nvarchar
Sprache	nvarchar
Passwort	nvarchar
Pin	nvarchar
SchnittstelleBenutzer	nvarchar
Partnernummer	nvarchar
Email	nvarchar
Benutzergruppe	nvarchar
Startbildschirm	nvarchar
Hauptmaschine	nvarchar
Stundensatz	decimal
Aktiv	bit
Zeiterfassung	bit
Arbeitszeit	decimal
Arbeitszeitcode	nvarchar
Wochenarbeitstage	int
Schichtplan	nvarchar
Urlaubstage	int

*/
