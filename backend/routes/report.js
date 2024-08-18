const express = require("express");
const {
  getItems,
  postItems,
  deleteItems,
  putItems,
} = require("../controllers/ReportController");

const router = express.Router();

// Define routes
router.get("/", getItems);
router.post("/", postItems);
router.put("/:id", deleteItems); // Ensure this is correctly defined
router.delete("/:id", putItems);

module.exports = router;
