const express = require("express");
const bodyParser = require("body-parser");
const passengerAnnouncementsRouter = require("./routes/passengerAnnouncements");

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Use the passenger announcements router
app.use("/passenger-announcements", passengerAnnouncementsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
