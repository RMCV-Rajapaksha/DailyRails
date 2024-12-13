// routes/trainRoutes.js

const express = require("express");
const router = express.Router();
const {
  createTrain,
  getAllTrains,
  getTrainById,
  deleteTrain,
} = require("../controller/TrainController");

// Create new train with stopping points
router.post("/", createTrain);

// Get all trains with their stopping points
router.get("/", getAllTrains);

// Get single train by ID with stopping points
router.get("/:id", getTrainById);

// Delete train and its stopping points
router.delete("/:id", deleteTrain);

module.exports = router;
