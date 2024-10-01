const express = require("express");
const { postAdmin, adminLogin } = require("../controller/AdminController");
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
router.post("/register", validateNewUser, validate, postAdmin);
router.post("/login", adminLogin);

module.exports = router;
