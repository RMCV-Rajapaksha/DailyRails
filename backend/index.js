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
app.use((req, res, next) => {
  if (req.originalUrl === "/api/bookings/webhook") {
    // Skip body parsing for webhook route
    next();
  } else {
    // Apply JSON body parser for all other routes
    express.json()(req, res, next);
  }
});

// CORS setup
// app.use(
//   cors({
//     origin: "http://localhost:3001",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps)
      if (!origin) return callback(null, true);

      // Allow localhost and Android emulator
      const allowedOrigins = [
        /^http:\/\/localhost:300[0-5]$/,
        /^http:\/\/10.0.2.2:300[0-5]$/,
        /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/,
        /^exp:\/\/[\w\.-]+\.exp\.direct:\d+$/,
        /^https?:\/\/.*\.expo\.io$/,
        "http://127.0.0.1:5500", // Fixed: removed trailing slash
        "http://127.0.0.1:5501",
      ];

      const regexPatterns = [
        new RegExp("^http://192\\.168\\.\\d{1,3}\\.\\d{1,3}(:\\d+)?$"),
        new RegExp("^exp://[\\w\\.-]+\\.exp\\.direct:\\d+$"),
        new RegExp("^https?://.*\\.expo\\.io$"),
      ];

      // Check if origin is in allowed list
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      // Check if origin matches any regex pattern
      for (let i = 0; i < regexPatterns.length; i++) {
        if (regexPatterns[i].test(origin)) {
          callback(null, true);
          return;
        }
      }

      // If we got here, origin is not allowed
      console.log(`Origin ${origin} not allowed by CORS`);
      callback(new Error("Not allowed by CORS"));
    },
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
// Routers
const AnnouncementRouter = require("./Features/Announcement/router/Announcements");
const ItemRouter = require("./Features/Items/router/Items");
const ReportRouter = require("./Features/Reports/router/Report");
const AdminRouter = require("./Features/Auth/router/AdminRouter");
const UserRouter = require("./Features/Auth/router/UserRouter");
const trainRoutes = require("./Features/Schedule/router/Train");
const stations = require("./Features/Station/router/Station");
const bookingRoutes = require("./Features/Booking/routes/BookingRoutes");
const journeyRoutes = require("./Features/Journey/router/Journey");
// Use the routers
app.use("/api/admin", AdminRouter);
app.use("/api/user", UserRouter);
app.use("/api/announcements", AnnouncementRouter);
app.use("/api/items", ItemRouter);
app.use("/api/reports", ReportRouter);
app.use("/api/trains", trainRoutes);
app.use("/api/stations", stations);
app.use("/api/bookings", bookingRoutes);
app.use("/api/journeys", journeyRoutes);

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
