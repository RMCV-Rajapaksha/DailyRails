const { body, param } = require("express-validator");

const validateNewAnnouncement = [
  body("Title")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("Title should be between 1 and 100 characters"),

  body("AnnouncementTo")
    .isString()
    .withMessage("Announcement_To must be a string")
    .isLength({ min: 1 })
    .withMessage("Announcement_To is required"),

  body("Description")
    .isString()
    .withMessage("Content must be a string")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Content should be between 1 and 1000 characters"),
];

const validateAnnouncementId = [
  param("id").isString().withMessage("Announcement ID must be a String"),
];

module.exports = {
  validateNewAnnouncement,
  validateAnnouncementId,
};
