const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../../models");

const Announcement = db.Announcement;

// GET all announcements with pagination
const getAnnouncement = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const announcementToFilter = req.query.Announcement_To;

  const whereClause = announcementToFilter
    ? { Announcement_To: announcementToFilter }
    : {};

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
};

// POST a new announcement
const postAnnouncement = async (req, res) => {
  const announcement = req.body;
  try {
    const newAnnouncement = await Announcement.create(announcement);
    res.json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ error: "Failed to create announcement" });
  }
};

// DELETE an announcement by ID
const deleteAnnouncement = async (req, res) => {
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
};

// PUT (update) an announcement by ID
const putAnnouncement = async (req, res) => {
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
};

module.exports = {
  getAnnouncement,
  postAnnouncement,
  deleteAnnouncement,
  putAnnouncement,
};
