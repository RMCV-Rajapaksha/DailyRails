const { body, param } = require("express-validator");

const validateNewAnnouncement = [
  body("Title")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("Title should be between 1 and 100 characters"),

  body("Announcement_To")
    .isString()
    .withMessage("Announcement_To must be a string")
    .isLength({ min: 1 })
    .withMessage("Announcement_To is required"),

  body("Content")
    .isString()
    .withMessage("Content must be a string")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Content should be between 1 and 1000 characters"),

  body("Date")
    .optional()
    .isISO8601()
    .withMessage("Date must be in ISO8601 format (YYYY-MM-DD)"),
];

const validateAnnouncementId = [
  param("id").isInt().withMessage("Announcement ID must be an integer"),
];

module.exports = {
  validateNewAnnouncement,
  validateAnnouncementId,
};
