// routes/trainRoutes.js

const express = require("express");
const router = express.Router();
const {
  createTrain,
  getAllTrains,
  getTrainById,
  deleteTrain,
  editTrain,
  getStoppingPointsByLocations,
  getTrainDetailsByLocations,
} = require("../controller/TrainController");
const {
  validateRequest,
  validateNewTrain,
  validateUpdateTrain,
  validateTrainId,
} = require("../validators/TrainValidators");

// Add new route
router.get("/search", getTrainDetailsByLocations);

// Create new train with stopping points
router.post("/", validateNewTrain, validateRequest, createTrain);

// Get all trains with their stopping points
router.get("/", getAllTrains);

// Get single train by ID with stopping points
router.get("/:id", getTrainById);

// Delete train and its stopping points
router.delete("/:id", deleteTrain);

// Update train with stopping points
// router.put("/:id", validateUpdateTrain, editTrain);

router.put("/:id", editTrain);

module.exports = router;
