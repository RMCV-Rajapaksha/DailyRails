const express = require("express");
require("dotenv").config();
const cors = require("cors"); // Make sure to import cors
const http = require("http"); // Import the http module
const app = express();
const db = require("./models"); // Ensure this path is correct
const {
  setupWebSocket,
} = require("./Features/Reports/controller/WebsocketServer");
// Middleware to parse JSON
app.use(express.json());

// CORS setup
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Routers
const AnnouncementRouter = require("./Features/Announcement/router/Announcements");
const ItemRouter = require("./Features/Items/router/Items");
const ReportRouter = require("./Features/Reports/router/Report");
const AdminRouter = require("./Features/Auth/router/AdminRouter");
const UserRouter = require("./Features/Auth/router/UserRouter");

// Use the routers
app.use("/api/admin", AdminRouter);
app.use("/api/user", UserRouter);
app.use("/api/announcements", AnnouncementRouter);
app.use("/api/items", ItemRouter);
app.use("/api/reports", ReportRouter);

// Create HTTP server
const server = http.createServer(app);

// Setup WebSocket using the same server
setupWebSocket(server);

// Sync database and start server
db.sequelize
  .sync()
  .then(() => {
    server.listen(4000, () => {
      console.log("Server running on port 4000");
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
