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
  newBooking,
} = require("../controller/BookingController");
const {
  createPaymentIntent,
  handlePaymentSuccess,
} = require("../controller/PaymentController");
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

// Payment routes
router.post("/create-payment-intent", createPaymentIntent);
router.get("/payment/success", handlePaymentSuccess);

// Create a new booking - Now this will only be called after payment success
// router.post("/", validateNewBooking, validate, createBooking);
router.post("/direct", createBooking); // Keep direct booking option for testing
router.post("/newBooking", newBooking); 

// Get all bookings with optional filters
router.get("/", getBookings);

// Get booked seats route - needs to be before /:id to prevent conflict
router.get("/findBookedSeats", findBookedSeats);

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

module.exports = router;
