const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define(
  "Product",
  {
    ID: { type: Sequelize.INTEGER, primaryKey: true },
    Stueckliste: { type: Sequelize.STRING },
    Stuecklistenvariante: { type: Sequelize.STRING },
    Stuecklistennummer: { type: Sequelize.STRING },
    Stuecklistentyp: { type: Sequelize.STRING },
    Stueckliste: { type: Sequelize.STRING },
    Stueckliste: { type: Sequelize.STRING },
    Stueckliste: { type: Sequelize.STRING },
    Artikel: { type: Sequelize.STRING },
    Preis: { type: Sequelize.DECIMAL },
    Zeichnungsnummer: { type: Sequelize.STRING },
    Zeichnung: { type: Sequelize.STRING },
    Hersteller: { type: Sequelize.STRING },
    Kombiwerkzeug: { type: Sequelize.BOOLEAN },
    DauerZusammenbau: { type: Sequelize.DECIMAL },
    Standmengenauswahl: { type: Sequelize.STRING },
    StandmengeRueckwaerts: { type: Sequelize.BOOLEAN },
    Zusatztext1: { type: Sequelize.STRING },
    Zusatztext2: { type: Sequelize.STRING },
    Zusatztext3: { type: Sequelize.STRING },
    Zusatztext4: { type: Sequelize.STRING },
    Zusatztext5: { type: Sequelize.STRING },
    Dokument1: { type: Sequelize.STRING },
    Dokument2: { type: Sequelize.STRING },
    Bemerkung: { type: Sequelize.STRING },
    AngelegtAm: { type: Sequelize.DATE },
    AngelegtVon: { type: Sequelize.STRING },
    BearbeitetAm: { type: Sequelize.DATE },
    BearbeitetVon: { type: Sequelize.STRING },
  },
  {
    tableName: "tblStuecklisten",
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Product;
/* 
COLUMN_NAME	DATA_TYPE	TYPE_NAME
ID	4	int
Stueckliste	-9	nvarchar
Stuecklistenvariante	-9	nvarchar
Stuecklistennummer	-9	nvarchar
Stuecklistentyp	-9	nvarchar
Artikel	-9	nvarchar
Preis	3	decimal
Zeichnungsnummer	-9	nvarchar
Zeichnung	-9	nvarchar
Hersteller	-9	nvarchar
Kombiwerkzeug	-7	bit
DauerZusammenbau	3	decimal
Standmengenauswahl	-9	nvarchar
StandmengeRueckwaerts	-7	bit
Zusatztext1	-9	nvarchar
Zusatztext2	-9	nvarchar
Zusatztext3	-9	nvarchar
Zusatztext4	-9	nvarchar
Zusatztext5	-9	nvarchar
Dokument1	-9	nvarchar
Dokument2	-9	nvarchar
Bemerkung	-9	nvarchar
AngelegtAm	11	datetime
AngelegtVon	-9	nvarchar
BearbeitetAm	11	datetime
BearbeitetVon	-9	nvarchar

*/
