const Auction = require("../models/Auction");

const joinAuction = async (ws, { auctionId }) => {
  try {
    const auction = await Auction.findByPk(auctionId);
    if (!auction) {
      ws.send(JSON.stringify({ error: "Auction not found" }));
      return;
    }
    ws.send(JSON.stringify({ auction }));
  } catch (error) {
    ws.send(JSON.stringify({ error: "Failed to join auction" }));
  }
};

module.exports = { joinAuction };
