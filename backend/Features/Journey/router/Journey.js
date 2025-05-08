const express = require("express");
const router = express.Router();

const { getJourneyByStations, getAllJourneys } = require("../controller/JourneyController");

router.get("/get-journey", getJourneyByStations);
router.get("/all", getAllJourneys);


module.exports = router;
