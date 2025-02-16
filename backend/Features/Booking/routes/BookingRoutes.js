const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controller/BookingController");

// Create a new booking
router.post("/", createBooking);

// Get all bookings with optional filters
router.get("/", getBookings);

// Get a specific booking by ID
router.get("/:id", getBookingById);

// Update a booking
router.put("/:id", updateBooking);

// Delete a booking
router.delete("/:id", deleteBooking);

module.exports = router;





