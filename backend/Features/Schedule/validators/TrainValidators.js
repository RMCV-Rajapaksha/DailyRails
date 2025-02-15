const { body, param } = require("express-validator");

const { validationResult } = require("express-validator");

// Wrapper for validation error handling
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().reduce((acc, err) => {
      acc[err.param] = err.msg; // Map field name to the error message
      return acc;
    }, {});

    return res.status(400).json({
      success: false,
      message: "Validation errors",
      errors: formattedErrors, // Send field-specific error messages
    });
  }
  next();
};

// Validation rules for creating a new train
const validateNewTrain = [
  body("Name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("Name should be between 1 and 50 characters")
    .notEmpty()
    .withMessage("Name is required"),

  // body("TrainID")
  //   .matches(/^[A-Z]\d{4}$/)
  //   .withMessage("TrainID must be 1 letter followed by 4 digits")
  //   .notEmpty()
  //   .withMessage("TrainID is required"),

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
    // .matches(/^([0-1][0-9]|2[0-3])$/)
    // .withMessage("StartTime must be in HH:mmformat")
    .notEmpty()
    .withMessage("StartTime is required"),

  body("EndTime")
    // .matches(/^([0-1][0-9]|2[0-3])$/)
    // .withMessage("EndTime must be in HH:mm format")
    .notEmpty()
    .withMessage("EndTime is required"),

  body("stoppingPoints")
    .isArray()
    .withMessage("stoppingPoints must be an array")
    .notEmpty()
    .withMessage("stoppingPoints is required"),

  body("stoppingPoints.*.StationName")
    .isString()
    .notEmpty()
    .withMessage("Station name is required"),

  body("stoppingPoints.*.ArrivalTime")
    // .matches(/^([0-1][0-9]|2[0-3])$/)
    // .withMessage("ArrivalTime must be in HH:mm format")
    .notEmpty()
    .withMessage("ArrivalTime is required"),

  body("stoppingPoints.*.DepartureTime")
    // .matches(/^([0-1][0-9]|2[0-3])$/)
    // .withMessage("DepartureTime must be in HH:mm format")
    .notEmpty()
    .withMessage("DepartureTime is required"),
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

  body("StartTime").optional(),
  // .matches(/^([0-1][0-9]|2[0-3])$/),

  body("EndTime").optional(),
  // .matches(/^([0-1][0-9]|2[0-3])$/),

  body("stoppingPoints").optional().isArray(),
];

// Validation rules for getting/deleting a train by ID
const validateTrainId = [
  param("id").isString().withMessage("Train ID is required"),
];

module.exports = {
  validateRequest,
  validateNewTrain,
  validateUpdateTrain,
  validateTrainId,
};
