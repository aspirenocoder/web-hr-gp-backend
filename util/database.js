const Sequelize = require("sequelize");
require("dotenv").config();
console.log(
  process.env.DBName,
  process.env.UserName,
  process.env.DBPassw,
  process.env.HostName,
  process.env.Port
);

const sequelize = new Sequelize(
  process.env.DBName,
  "avnadmin",
  process.env.DBPassw,
  {
    dialect: "mysql",
    host: process.env.HostName,
    port: process.env.Port,
  }
);

module.exports = sequelize;
