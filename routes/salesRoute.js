const express = require("express");
const router = express.Router();
const expressWs = require("express-ws");
const app = express();
expressWs(app);
const { getAllSales } = require("../controller/sales");
const salesWebSocket = require("../lib/wsSales");
// const { Server: WebSocketServer } = require("ws");

router.ws("/", (ws, req) => {
  salesWebSocket.handleUpgrade(req, ws, (socket) => {
    salesWebSocket.emit("connection", socket, req);
  });
});

router.get("/sales", getAllSales);

module.exports = router;
