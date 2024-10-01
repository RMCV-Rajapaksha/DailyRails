const { body, param } = require("express-validator");

const validateNewUser = [
  body("EmployeeID")
    .isString()
    .withMessage("EmployeeID must be a string")
    .isLength({ min: 1, max: 20 })
    .withMessage("EmployeeID should be between 1 and 20 characters"),

  body("Name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("Name should be between 1 and 50 characters"),

  body("Email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .isLength({ max: 100 })
    .withMessage("Email should not exceed 100 characters"),

  body("Password")
    .isStrongPassword()
    .withMessage(
      "Password must be strong (min 8 chars, include uppercase, lowercase, number, and symbol)"
    ),

  body("JobTitle")
    .isString()
    .withMessage("JobTitle must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("JobTitle should be between 1 and 100 characters"),
];

const validateUserId = [
  param("ID").isInt().withMessage("User ID must be an integer"),
];

module.exports = {
  validateNewUser,
  validateUserId,
};
