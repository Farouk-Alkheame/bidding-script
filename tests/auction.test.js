const Auction = require("../models/Auction");
const { joinAuction } = require("../services/auctionService");

jest.mock("../models/Auction");

describe("Auction Service", () => {
  test("should join an auction successfully", async () => {
    const ws = { send: jest.fn() };
    const mockAuction = { id: 1, title: "Test Auction" };

    Auction.findByPk.mockResolvedValue(mockAuction);

    await joinAuction(ws, { auctionId: 1 });

    expect(ws.send).toHaveBeenCalledWith(
      JSON.stringify({ auction: mockAuction })
    );
  });

  test("should return error if auction not found", async () => {
    const ws = { send: jest.fn() };

    Auction.findByPk.mockResolvedValue(null);

    await joinAuction(ws, { auctionId: 999 });

    expect(ws.send).toHaveBeenCalledWith(
      JSON.stringify({ error: "Auction not found" })
    );
  });
});
