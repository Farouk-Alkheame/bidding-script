const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");

const Auction = sequelize.define("Auction", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  start_time: { type: DataTypes.DATE, allowNull: false },
  end_time: { type: DataTypes.DATE, allowNull: false },
});

module.exports = Auction;
