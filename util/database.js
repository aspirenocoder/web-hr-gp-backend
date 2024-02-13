const Sequelize = require("sequelize")

const sequelize = new Sequelize(
    "defaultdb",
    "avnadmin",
    "AVNS_ZcJcUB5mhTBQrpO2bCy",
    {
      dialect: "mysql",
      host: "mysql-24d8e3fd-project-bf98.a.aivencloud.com",
      port: "17777",
    }
  );

  module.exports = sequelize