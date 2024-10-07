const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST || "localhost",
    dialect: "mysql",
  }
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL database.");
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
  }
};

module.exports = { sequelize, connectToDatabase };
