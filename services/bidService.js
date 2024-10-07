const Bid = require("../models/Bid");
const { redisClient } = require("../config/redis");
const { rateLimiter } = require("../utils/rateLimiter");

const placeBid = async (ws, { auctionId, userId, bidAmount }) => {
  try {
    // Rate limiting
    if (!rateLimiter(userId)) {
      ws.send(JSON.stringify({ error: "Too many bids, please wait." }));
      return;
    }

    // Store bid in database
    const bid = await Bid.create({ auctionId, userId, bidAmount });

    // Cache highest bid in Redis
    await redisClient.set(`auction_${auctionId}_highest_bid`, bidAmount);

    // Broadcast the new highest bid
    ws.send(JSON.stringify({ success: true, bid }));
  } catch (error) {
    ws.send(JSON.stringify({ error: "Failed to place bid" }));
  }
};

module.exports = { placeBid };
