const express = require("express");
require("dotenv").config();
const cors = require("cors"); // Import cors
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
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3001", // React web app (local development)
        "http://localhost:19006", // Expo local development
        "http://127.0.0.1:19006", // Expo local development (Android Emulator)
        "http://<your-local-ip>:19006", // Replace with your machine's IP address (Expo on physical devices)
        "https://<your-production-domain>", // Production domain
      ];
      const regex = /^http:\/\/localhost:300[0-5]$/;

      // Allow if origin is undefined (e.g., Postman) or matches the allowed origins
      if (!origin || allowedOrigins.includes(origin) || regex.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
const trainRoutes = require("./Features/Schedule/router/Train");

// Use the routers
app.use("/api/admin", AdminRouter);
app.use("/api/user", UserRouter);
app.use("/api/announcements", AnnouncementRouter);
app.use("/api/items", ItemRouter);
app.use("/api/reports", ReportRouter);
app.use("/api/trains", trainRoutes);

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
