const Bid = require("../models/Bid");
const { redisClient } = require("../config/redis");
const { placeBid } = require("../services/bidService");
const { rateLimiter } = require("../utils/rateLimiter");

jest.mock("../models/Bid");
jest.mock("../config/redis");
jest.mock("../utils/rateLimiter");

describe("Bid Service", () => {
  test("should place bid and cache highest bid in Redis", async () => {
    const ws = { send: jest.fn() };
    rateLimiter.mockReturnValue(true);
    redisClient.set.mockResolvedValue();
    Bid.create.mockResolvedValue({ bidAmount: 100 });

    await placeBid(ws, { auctionId: 1, userId: 1, bidAmount: 100 });

    expect(Bid.create).toHaveBeenCalled();
    expect(redisClient.set).toHaveBeenCalledWith("auction_1_highest_bid", 100);
    expect(ws.send).toHaveBeenCalledWith(
      JSON.stringify({ success: true, bid: { bidAmount: 100 } })
    );
  });

  test("should handle rate limiting", async () => {
    const ws = { send: jest.fn() };
    rateLimiter.mockReturnValue(false);

    await placeBid(ws, { auctionId: 1, userId: 1, bidAmount: 100 });

    expect(ws.send).toHaveBeenCalledWith(
      JSON.stringify({ error: "Too many bids, please wait." })
    );
  });
});
