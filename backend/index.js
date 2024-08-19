const express = require("express");
const app = express();
const db = require("./models"); // Ensure this path is correct

// Middleware to parse JSON
app.use(express.json());

// Routers
const AnnouncementRouter = require("./routes/Announcements"); // This should be correct
const ItemRouter = require("./items/router/Items"); // Update this path
const ReportRouter = require("./routes/Report");

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
