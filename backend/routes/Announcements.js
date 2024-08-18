const express = require("express");
const {
  getAnnouncement,
  postAnnouncement,
  deleteAnnouncement,
  putAnnouncement,
} = require("../controllers/AnnouncementsController");

const router = express.Router();

// Define routes
router.get("/", getAnnouncement);
router.post("/", postAnnouncement);
router.put("/:id", putAnnouncement); // Ensure this is correctly defined
router.delete("/:id", deleteAnnouncement);

module.exports = router;
