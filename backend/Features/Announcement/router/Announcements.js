const express = require("express");
const {
  getAnnouncement,
  postAnnouncement,
  deleteAnnouncement,
  putAnnouncement,
} = require("../controller/AnnouncementsController");
const {
  validateNewAnnouncement,
  validateAnnouncementId,
} = require("../validators/AnnouncementsValidators");
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

// validateNewAnnouncement, validate,
// Define routes
router.get("/", getAnnouncement);
router.post("/", postAnnouncement);
router.put(
  "/:id",
  validateAnnouncementId,
  validateNewAnnouncement,
  validate,
  putAnnouncement
);
router.delete("/:id", validateAnnouncementId, validate, deleteAnnouncement);

module.exports = router;
