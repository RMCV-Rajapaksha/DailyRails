const { body, param } = require("express-validator");

// Validation rules for creating a new report
const validateNewReport = [
  body("Name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 1, max: 20 })
    .withMessage("Name should be between 1 and 20 characters"),

  body("NIC")
    .isString()
    .withMessage("NIC must be a string")
    .isLength({ min: 10, max: 20 })
    .withMessage("NIC should be between 10 and 20 characters"),

  body("Type")
    .isString()
    .withMessage("Type must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("Type should be between 1 and 50 characters"),

  body("Description")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Description should be between 1 and 1000 characters"),

  body("ClosestStation")
    .isString()
    .withMessage("ClosestStation must be a string")
    .isLength({ min: 1, max: 1000 })
    .withMessage("ClosestStation should be between 1 and 1000 characters"),
];

// Validation rules for updating an existing report
const validateUpdateReport = [
  param("id").isInt().withMessage("Report ID must be an integer"),
  body("Name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 1, max: 20 })
    .withMessage("Name should be between 1 and 20 characters"),

  body("NIC")
    .optional()
    .isString()
    .withMessage("NIC must be a string")
    .isLength({ min: 10, max: 20 })
    .withMessage("NIC should be between 10 and 20 characters"),

  body("Type")
    .optional()
    .isString()
    .withMessage("Type must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("Type should be between 1 and 50 characters"),

  body("Description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Description should be between 1 and 1000 characters"),

  body("ClosestStation")
    .optional()
    .isString()
    .withMessage("ClosestStation must be a string")
    .isLength({ min: 1, max: 1000 })
    .withMessage("ClosestStation should be between 1 and 1000 characters"),
];

// Validation rules for deleting a report by ID
const validateReportId = [
  param("id").isInt().withMessage("Report ID must be an integer"),
];

module.exports = {
  validateNewReport,
  validateUpdateReport,
  validateReportId,
};
