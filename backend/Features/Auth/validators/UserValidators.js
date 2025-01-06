const { body, param } = require("express-validator");

const validateNewUser = [
  body("FirstName")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 1, max: 50 })
    .withMessage("Name should be between 1 and 50 characters"),

  body("FirstName")
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
];

const validateLogin = [
  body("Email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .isLength({ max: 100 })
    .withMessage("Email should not exceed 100 characters"),

  body("Password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long")
    .withMessage(
      "Password must include uppercase, lowercase, numbers, and symbols"
    ),
];

const validateUserId = [
  param("ID").isInt().withMessage("User ID must be an integer"),
];

module.exports = {
  validateNewUser,
  validateUserId,
  validateLogin,
};
