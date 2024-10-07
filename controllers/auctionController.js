const { placeBid } = require("../services/bidService");
const { joinAuction } = require("../services/auctionService");

const auctionController = (ws, data) => {
  switch (data.event) {
    case "joinAuction":
      joinAuction(ws, data);
      break;
    case "placeBid":
      placeBid(ws, data);
      break;
    default:
      ws.send("Invalid event");
      break;
  }
};

module.exports = { auctionController };
