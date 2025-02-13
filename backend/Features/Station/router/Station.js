// filepath: /C:/Users/ROG/OneDrive/Desktop/Projects/5 Sem  and 6 Sem  project/Code-5/DailyRails/backend/Features/Station/router/Station.js
const express = require("express");
const {
  createStation,
  getAllStations,
  getStationById,
  updateStationById,
  deleteStationById,
} = require("../controller/StationController");
const { validationResult } = require("express-validator");
const stationValidators = require("../validators/StationValidators");

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = {};
    errors.array().forEach((error) => {
      formattedErrors[error.path] = error.msg;
    });
    return res.status(400).json({ errors: formattedErrors });
  }
  next();
};

// Define routes
router.post("/", stationValidators, validate, createStation);
router.get("/", getAllStations);
router.get("/:id", getStationById);
router.patch("/:id", validate, updateStationById);
router.delete("/:id", deleteStationById);

module.exports = router;
