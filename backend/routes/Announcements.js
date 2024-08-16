const express = require("express");
const router = express.Router();
const { Announcement } = require("../models");

// GET all announcements with pagination
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
  const offset = (page - 1) * limit;

  // Get the filter value from the query parameters
  const announcementToFilter = req.query.Announcement_To;

  // Create the where clause conditionally based on the filter
  const whereClause = announcementToFilter
    ? { Announcement_To: announcementToFilter } // Filter by the specific value
    : {}; // No filtering if no value is provided

  try {
    const { count, rows: announcements } = await Announcement.findAndCountAll({
      where: whereClause,
      offset,
      limit,
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      announcements,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
});

// POST a new announcement
router.post("/", async (req, res) => {
  const announcement = req.body;
  try {
    const newAnnouncement = await Announcement.create(announcement);
    res.json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ error: "Failed to create announcement" });
  }
});

// DELETE an announcement by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const rowsDeleted = await Announcement.destroy({
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
    const announcement = await Announcement.findByPk(id);
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
