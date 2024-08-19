const express = require("express");
const {
  getItemApproved,
  getItemNotApproved,
  postItem,
  deleteItem,
  patchItem,
} = require("../controller/ItemsController");

const router = express.Router();

// Define routes
router.get("/", getItemApproved);
router.get("/notapprove", getItemNotApproved);
router.post("/", postItem); // Ensure this is correctly defined
router.delete("/:id", deleteItem);
router.patch("/:id/:status", patchItem);

module.exports = router;
