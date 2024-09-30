const { body, param } = require("express-validator");

const validateNewItem = [
  body("Name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 1, max: 20 })
    .withMessage("Name should be between 1 and 20 characters"),

  body("ItemType")
    .isString()
    .withMessage("ItemType must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("ItemType should be between 1 and 50 characters"),

  body("Title")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("Title should be between 1 and 50 characters"),

  body("Description")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Description should be between 1 and 1000 characters"),

  body("ContactNo")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number"),

  body("Status")
    .optional()
    .isIn(["Approved", "Not Approved"])
    .withMessage("Invalid status"),
];

const validateItemId = [
  param("id").isInt().withMessage("Item ID must be an integer"),
];

const validateStatusUpdate = [
  param("status")
    .isIn(["Approved", "Not Approved"])
    .withMessage("Status must be 'Approved' or 'Not Approved'"),
];

module.exports = {
  validateNewItem,
  validateItemId,
  validateStatusUpdate,
};
