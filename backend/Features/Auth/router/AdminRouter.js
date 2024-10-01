const express = require("express");
const { postUser } = require("../controller/AdminController");
const {
  validateNewUser,
  validateUserId,
} = require("../validators/AdminValidators");
const { validationResult } = require("express-validator");

const router = express.Router();

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Route for creating a new user
router.post("/", validateNewUser, validate, postUser);

module.exports = router;
