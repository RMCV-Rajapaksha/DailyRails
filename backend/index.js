const express = require("express");
const cors = require("cors"); // Make sure to import cors
const app = express();
const db = require("./models"); // Ensure this path is correct

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

// Use the routers
app.use("/api/announcements", AnnouncementRouter);
app.use("/api/items", ItemRouter);
app.use("/api/reports", ReportRouter);

// Sync database and start server
db.sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
