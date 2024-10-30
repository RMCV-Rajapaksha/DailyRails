// features/trains/routes/trainsRoutes.js
const express = require("express");
const router = express.Router();
const trainsController = require("../controllers/trainsController");

router.post("/", trainsController.createTrain);
router.get("/", trainsController.getAllTrains);
router.get("/:id", trainsController.getTrainById);
router.put("/:id", trainsController.updateTrain);
router.delete("/:id", trainsController.deleteTrain);

module.exports = router;
