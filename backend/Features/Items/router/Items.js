const express = require("express");
const {
  getItemApproved,
  getItemNotApproved,
  postItem,
  deleteItem,
  patchItem,
} = require("../controller/ItemsController");
const {
  validateNewItem,
  validateItemId,
  validateStatusUpdate,
} = require("../validators/ItemsValidators");
const { validationResult } = require("express-validator");

const router = express.Router();

// Middleware to check validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Define routes
router.get("/", getItemApproved);
router.get("/notapprove", getItemNotApproved);
router.post("/", validateNewItem, validate, postItem);
router.delete("/:id", validateItemId, validate, deleteItem);
router.patch(
  "/:id/:status",
  validateItemId,
  validateStatusUpdate,
  validate,
  patchItem
);

module.exports = router;
