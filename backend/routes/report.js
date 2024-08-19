const express = require("express");
const {
  getReport,
  postReport,
  deleteReport,
  putReport,
} = require("../controllers/ReportController");

const router = express.Router(); // This is correct

// Define routes
router.get("/", getReport);
router.post("/", postReport);
router.put("/:id", putReport);
router.delete("/:id", deleteReport);

module.exports = router;
