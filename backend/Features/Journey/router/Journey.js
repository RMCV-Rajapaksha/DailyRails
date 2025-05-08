const express = require("express");
const router = express.Router();

const { getJourneyByStations, getAllJourneys, getJourneyById } = require("../controller/JourneyController");

router.get("/get-journey", getJourneyByStations);
router.get("/all", getAllJourneys);
router.get("/:id", getJourneyById);

module.exports = router;
