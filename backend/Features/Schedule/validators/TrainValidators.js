const { body, param } = require("express-validator");

// Validation rules for creating a new train
const validateNewTrain = [
  body("Name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("Name should be between 1 and 50 characters"),

  body("TrainID")
    .matches(/^[A-Z]\d{4}$/)
    .withMessage("TrainID must be 1 letter followed by 4 digits"),

  body("StartStations")
    .isString()
    .withMessage("StartStations must be a string")
    .notEmpty()
    .withMessage("StartStations is required"),

  body("EndStations")
    .isString()
    .withMessage("EndStations must be a string")
    .notEmpty()
    .withMessage("EndStations is required"),

  body("StartTime")
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage("StartTime must be in HH:mm:ss format"),

  body("EndTime")
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage("EndTime must be in HH:mm:ss format"),

  body("stoppingPoints")
    .isArray()
    .withMessage("stoppingPoints must be an array"),

  body("stoppingPoints.*.StationName")
    .isString()
    .notEmpty()
    .withMessage("Station name is required"),

  body("stoppingPoints.*.ArrivalTime")
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage("ArrivalTime must be in HH:mm:ss format"),

  body("stoppingPoints.*.DepartureTime")
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage("DepartureTime must be in HH:mm:ss format"),
];

// Validation rules for updating an existing train
const validateUpdateTrain = [
  param("id").isString().withMessage("Train ID is required"),

  body("Name")
    .optional()
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage("Name should be between 1 and 50 characters"),

  body("TrainID")
    .optional()
    .matches(/^[A-Z]\d{4}$/)
    .withMessage("TrainID must be 1 letter followed by 4 digits"),

  body("StartStations").optional().isString().notEmpty(),

  body("EndStations").optional().isString().notEmpty(),

  body("StartTime")
    .optional()
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),

  body("EndTime")
    .optional()
    .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),

  body("stoppingPoints").optional().isArray(),
];

// Validation rules for getting/deleting a train by ID
const validateTrainId = [
  param("id").isString().withMessage("Train ID is required"),
];

module.exports = {
  validateNewTrain,
  validateUpdateTrain,
  validateTrainId,
};
