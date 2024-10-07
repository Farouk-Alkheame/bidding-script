require("dotenv").config();

const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { connectToDatabase } = require("./config/sequelize");
const { initRedis } = require("./config/redis");
const { auctionController } = require("./controllers/auctionController");
const User = require("./models/User");
const Auction = require("./models/Auction");
const Bid = require("./models/Bid");

// Initialize express
const app = express();
const server = http.createServer(app);

// Initialize WebSocket
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    auctionController(ws, data);
  });
});

// Start server
const startServer = async () => {
  await connectToDatabase();
  await User.sync();
  await Auction.sync();
  await Bid.sync();
  await initRedis();

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
