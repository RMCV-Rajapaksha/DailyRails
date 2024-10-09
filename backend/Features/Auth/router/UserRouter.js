const express = require("express");
const { postUser } = require("../controller/UserController");
const {
  validateNewUser,
  validateUserId,
  validateLogin,
} = require("../validators/UserValidators");
const { validationResult } = require("express-validator");
const {
  isAuthenticated,
  isMainAdmin,
  isCounter,
  isTrainDriver,
} = require("../../../Middlewares/adminAuthMiddleware");

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
router.post("/register", validateNewUser, validate, postUser);
// router.post("/login", validateLogin, validate, adminLogin);
// router.post("/logout", adminLogout);
module.exports = router;
