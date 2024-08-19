const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../models"); // Adjust the path according to your project structure

const Report = db.Report;
// GET all reports with pagination
const getReport = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const typeToFilter = req.query.Type;

  const whereClause = typeToFilter ? { Type: typeToFilter } : {};

  try {
    const { count, rows: reports } = await Report.findAndCountAll({
      where: whereClause,
      offset,
      limit,
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      reports,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};

// POST a new report

const postReport = async (req, res) => {
  const reportData = req.body;

  // Validate the incoming data (example validation)
  if (
    !reportData.Name ||
    !reportData.NIC ||
    !reportData.Type ||
    !reportData.Description ||
    !reportData.ClosestStation
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newReport = await Report.create(reportData);
    res.status(201).json(newReport); // Use 201 status code for resource creation
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Failed to create report" });
  }
};

// DELETE a report by ID
const deleteReport = async (req, res) => {
  const id = req.params.id;
  try {
    const rowsDeleted = await Report.destroy({
      where: { ID: id },
    });
    if (rowsDeleted > 0) {
      res.json({ message: "Report deleted successfully" });
    } else {
      res.status(404).json({ error: "Report not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete report" });
  }
};

// PUT (update) a report by ID
const putReport = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const report = await Report.findByPk(id);
    if (report) {
      await report.update(updatedData);
      res.json({ message: "Report updated successfully", report });
    } else {
      res.status(404).json({ error: "Report not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update report" });
  }
};

module.exports = {
  getReport,
  postReport,
  deleteReport,
  putReport,
};
