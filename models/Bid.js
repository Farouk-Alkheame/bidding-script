const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");
const User = require("./User");
const Auction = require("./Auction");

const Bid = sequelize.define("Bid", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  bid_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Bid.belongsTo(User, { foreignKey: "userId" });
Bid.belongsTo(Auction, { foreignKey: "auctionId" });

module.exports = Bid;
