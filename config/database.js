const Sequelize = require("sequelize");
const sequelize = new Sequelize("GTMS_KaffeeBar", "sa", "freebsd", {
  host: "localhost",
  dialect: "mssql",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

module.exports = sequelize;
