const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../../models"); // Adjust the path according to your project structure
const WebSocket = require("ws");
const Report = db.Report;

// GET all reports with pagination
const getReport = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows: reports } = await Report.findAndCountAll({
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

// Add this function after the getReport function

// Create new report
const postReport = async (req, res) => {
  try {
    // Generate a unique report ID with timestamp and random number
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    const reportId = `RPT${timestamp}${random}`;

    // Create new report with generated ID and request body data
    const newReport = await Report.create({
      ReportID: reportId,
      Name: req.body.Name,
      NIC: req.body.NIC,
      Type: req.body.Type,
      Description: req.body.Description,
      ClosestStation: req.body.ClosestStation,
    });

    // Send success response
    res.status(201).json({
      message: "Report created successfully",
      report: newReport,
    });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({
      error: "Failed to create report",
      details: error.message,
    });
  }
};

// Fix delete function
const deleteReport = async (req, res) => {
  const id = req.params.id;
  try {
    const rowsDeleted = await Report.destroy({
      where: { ReportID: id }, // Changed from ID to ReportID
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

// Fix update function
const putReport = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const report = await Report.findOne({
      where: { ReportID: id }, // Changed from findByPk to findOne with ReportID
    });
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
