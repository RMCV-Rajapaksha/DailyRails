const express = require("express");
const router = express.Router();
const { PassengerAnnouncement } = require("../models");

// GET all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await PassengerAnnouncement.findAll();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
});

// POST a new announcement
router.post("/", async (req, res) => {
  const announcement = req.body;
  try {
    const newAnnouncement = await PassengerAnnouncement.create(announcement);
    res.json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ error: "Failed to create announcement" });
  }
});

// DELETE an announcement by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const rowsDeleted = await PassengerAnnouncement.destroy({
      where: { ID: id },
    });
    if (rowsDeleted > 0) {
      res.json({ message: "Announcement deleted successfully" });
    } else {
      res.status(404).json({ error: "Announcement not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete announcement" });
  }
});

// PUT (update) an announcement by ID
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const announcement = await PassengerAnnouncement.findByPk(id);
    if (announcement) {
      await announcement.update(updatedData);
      res.json({ message: "Announcement updated successfully", announcement });
    } else {
      res.status(404).json({ error: "Announcement not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update announcement" });
  }
});

module.exports = router;
