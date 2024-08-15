const express = require("express");
const app = express();
const db = require("./models");

// Middleware to parse JSON
app.use(express.json());

// Routers
const passengerAnnouncementRouter = require("./routes/PassengerAnnouncements");
app.use("/passenger-announcements", passengerAnnouncementRouter);

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
