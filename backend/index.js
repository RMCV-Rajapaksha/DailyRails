const express = require("express");
const app = express();
const db = require("./models"); // Ensure this path is correct

// Middleware to parse JSON
app.use(express.json());

// Routers
const AnnouncementRouter = require("./Features/Announcement/router/Announcements"); // This should be correct
const ItemRouter = require("./Features/Items/router/Items"); // Update this path
const ReportRouter = require("./Features/Reports/router/Report");

app.use("/announcements", AnnouncementRouter);
app.use("/items", ItemRouter);
app.use("/reports", ReportRouter);

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
