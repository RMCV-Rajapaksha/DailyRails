const express = require("express");
const app = express();
const db = require("./models"); // Ensure this path is correct

// Middleware to parse JSON
app.use(express.json());

// Routers
const AnnouncementRouter = require("./routes/announcements"); // This should be correct
const ItemRouter = require("./routes/items"); // Update this path

app.use("/announcements", AnnouncementRouter);
app.use("/items", ItemRouter);

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
