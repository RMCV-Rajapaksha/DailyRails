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

// POST a new report

// Modified postReport function
const postReport = async (req, res) => {
  try {
    const newReport = await Report.create({
      ReportID: req.body.ReportID,
      Name: req.body.Name,
      NIC: req.body.NIC,
      Type: req.body.Type,
      Description: req.body.Description,
      ClosestStation: req.body.ClosestStation,
    });

    // WebSocket broadcast
    try {
      const ws = new WebSocket("ws://localhost:3000");
      ws.on("open", () => {
        ws.send(
          JSON.stringify({
            type: "NEW_REPORT",
            data: newReport,
          })
        );
        ws.close();
      });
    } catch (wsError) {
      console.error("WebSocket error:", wsError);
      // Don't fail the request if WebSocket fails
    }

    return res.status(201).json(newReport);
  } catch (error) {
    console.error("Report creation error:", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Validation error",
        errors: error.errors.reduce(
          (acc, err) => ({
            ...acc,
            [err.path]: err.message,
          }),
          {}
        ),
      });
    }
    return res.status(500).json({
      error: "Failed to create report",
      details: error.message,
    });
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
