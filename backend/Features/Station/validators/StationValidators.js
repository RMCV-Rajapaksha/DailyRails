// filepath: /C:/Users/ROG/OneDrive/Desktop/Projects/5 Sem  and 6 Sem  project/Code-5/DailyRails/backend/Features/Station/validators/StationValidators.js

const { body } = require("express-validator");

const stationValidators = [
  body("StationName")
    .isString()
    .withMessage("StationName must be a string")
    .isLength({ min: 1 })
    .withMessage("StationName is required"),
  body("StationID")
    .isString()
    .withMessage("StationID must be a string")
    .isLength({ min: 1 })
    .withMessage("StationID is required"),
  body("StationAddress")
    .isString()
    .withMessage("StationAddress must be a string")
    .isLength({ min: 1 })
    .withMessage("StationAddress is required"),
  body("StationLine")
    .isString()
    .withMessage("StationLine must be a string")
    .isLength({ min: 1 })
    .withMessage("StationLine is required"),
  body("ContactNumber")
    .isString()
    .withMessage("ContactNumber must be a string")
    .isLength({ min: 1 })
    .withMessage("ContactNumber is required"),
];

module.exports = stationValidators;
