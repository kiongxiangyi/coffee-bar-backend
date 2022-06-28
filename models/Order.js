const Sequelize = require("sequelize");
const sequelize = require("../config/database");

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};

const Order = sequelize.define(
  "Order",
  {
    ID: { type: Sequelize.INTEGER },
    Stueckliste: { type: Sequelize.STRING },
    Stuecklistenvariante: { type: Sequelize.STRING },
    Bauteil: { type: Sequelize.STRING },
    Bauteilvariante: { type: Sequelize.STRING },
    Operation: { type: Sequelize.STRING },
    Maschine: { type: Sequelize.STRING },
    Spindel: { type: Sequelize.STRING },
    Auftragsnummer: { type: Sequelize.STRING },
    Menge: { type: Sequelize.DECIMAL },
    BenoetigtAm: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    Wechselstatus: { type: Sequelize.STRING },
    Wechselgrund: { type: Sequelize.STRING },
    Restwert: { type: Sequelize.DECIMAL },
    Bemerkung: { type: Sequelize.STRING },
    AngelegtAm: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    AngelegtVon: { type: Sequelize.STRING },
    ErledigtAm: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    ErledigtVon: { type: Sequelize.STRING },
    VerschleissID: { type: Sequelize.INTEGER },
    Vermessen: { type: Sequelize.BOOLEAN },
    Neu: { type: Sequelize.BOOLEAN },
    Werkzeug: { type: Sequelize.BOOLEAN },
  },
  {
    tableName: "tblStuecklistenWechsel",
    id: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Order;
/* 
Column_name	Type
ID	int
Stueckliste	nvarchar
Stuecklistenvariante	nvarchar
Bauteil	nvarchar
Bauteilvariante	nvarchar
Operation	nvarchar
Maschine	nvarchar
Spindel	nvarchar
Auftragsnummer	nvarchar
Menge	decimal
BenoetigtAm	datetime
Wechselstatus	nvarchar
Wechselgrund	nvarchar
Restwert	decimal
Bemerkung	nvarchar
AngelegtAm	datetime
AngelegtVon	nvarchar
ErledigtAm	datetime
ErledigtVon	nvarchar
VerschleissID	int
Vermessen	bit
Neu	bit
Werkzeug	bit

*/
