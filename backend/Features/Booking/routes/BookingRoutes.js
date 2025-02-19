const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  findBookedSeats,
} = require("../controller/BookingController");
const {
  validateNewBooking,
  validateBookingId,
} = require("../validators/BookingValidators");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Create a new booking
router.post("/", validateNewBooking, validate, createBooking);

// Get all bookings with optional filters
router.get("/", getBookings);

// Get a specific booking by ID
router.get("/:id", validateBookingId, validate, getBookingById);

// Update a booking
router.put(
  "/:id",
  validateBookingId,
  validateNewBooking,
  validate,
  updateBooking
);

// Delete a booking
router.delete("/:id", validateBookingId, validate, deleteBooking);

router.get("/findBookedSeats", findBookedSeats);

module.exports = router;
