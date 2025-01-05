const { WebSocketServer, WebSocket } = require("ws");

// Function to handle WebSocket setup
const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("New Client Connected");

    ws.on("message", (data) => {
      console.log("Received a message from the client: " + data);
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = { setupWebSocket };

// ws://localhost:3000
