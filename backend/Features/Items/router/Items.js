const express = require("express");
const {
  getItemApproved,
  getItemNotApproved,
  getLostItems,
  getFoundItems,
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
const {
  isAuthenticated,
  isMainAdmin,
  isCounter,
  isTrainDriver,
} = require("../../../Middlewares/adminAuthMiddleware");
const router = express.Router();

// Middleware to check validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = {};
    errors.array().forEach((error) => {
      formattedErrors[error.path] = error.msg;
    });
    return res.status(400).json({ errors: formattedErrors });
  }
  next();
};

// Define routes
router.get("/", getItemApproved);
router.get("/notapprove", getItemNotApproved);
router.get("/lost", getLostItems);
router.get("/found", getFoundItems);
router.post("/", validateNewItem, validate, postItem);
router.delete("/:id", validateItemId, validate, deleteItem);
router.patch("/:id", validateItemId, validate, patchItem);

module.exports = router;
