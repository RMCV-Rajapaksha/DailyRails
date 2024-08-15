const express = require("express");
const router = express.Router();
const { PassengerAnnouncement } = require("../models");

router.get("/", async (req, res) => {
  try {
    const announcements = await PassengerAnnouncement.findAll();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
});

router.post("/", async (req, res) => {
  const announcement = req.body;
  try {
    const newAnnouncement = await PassengerAnnouncement.create(announcement);
    res.json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ error: "Failed to create announcement" });
  }
});

module.exports = router;
