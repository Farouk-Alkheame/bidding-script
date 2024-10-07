const WebSocket = require("ws");
const http = require("http");
const server = require("../server");

let wss;
let testServer;

beforeAll((done) => {
  testServer = http.createServer();
  wss = new WebSocket.Server({ server: testServer });
  testServer.listen(4000, done);
});

afterAll((done) => {
  wss.close();
  testServer.close(done);
});

test("should connect to WebSocket and join auction", (done) => {
  const client = new WebSocket("ws://localhost:4000");

  client.on("open", () => {
    client.send(JSON.stringify({ event: "joinAuction", auctionId: 1 }));
  });

  client.on("message", (message) => {
    const data = JSON.parse(message);
    expect(data.auction).toBeDefined();
    client.close();
    done();
  });
});
