const express = require("express");
const {
  postAdmin,
  adminLogin,
  adminLogout,
  adminUpdate,
} = require("../controller/AdminController");
const {
  validateNewAdmin,
  validateLogin,
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
router.post("/register", postAdmin);
router.post("/login", validateLogin, validate, adminLogin);
router.post("/logout", adminLogout);
router.put("/:id", validate, adminUpdate);
module.exports = router;
