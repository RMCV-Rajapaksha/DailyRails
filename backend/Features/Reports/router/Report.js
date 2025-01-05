const express = require("express");
const {
  getReport,
  postReport,
  deleteReport,
  putReport,
} = require("../controller/ReportController");
const {
  validateNewReport,
  validateUpdateReport,
  validateReportId,
} = require("../validators/ReportValidators");

const { validationResult } = require("express-validator");
const {
  isAuthenticated,
  isMainAdmin,
  isCounter,
  isTrainDriver,
} = require("../../../Middlewares/adminAuthMiddleware");

const router = express.Router();

// Middleware to check validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Define routes
router.get("/", getReport);
router.post("/", validateNewReport, validate, postReport);
router.put("/:id", validateReportId, validateUpdateReport, validate, putReport);
router.delete("/:id", validateReportId, validate, deleteReport);

module.exports = router;
