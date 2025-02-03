const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    mobilenumber: {
        type: Sequelize.STRING,
    },
    otp: {
        type: Sequelize.STRING,
        unique: true,
    },
});
module.exports = User