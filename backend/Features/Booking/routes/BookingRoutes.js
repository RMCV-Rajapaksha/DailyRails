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
  createPaymentIntent,
  handleWebhookEvent,
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

// Create a new booking
router.post("/", createBooking);

// Special route for Stripe webhook - this needs raw body parser
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleWebhookEvent
);

// Get all bookings with optional filters
router.get("/", getBookings);

// Important: Place this before the routes with path parameters
router.get("/findBookedSeats", findBookedSeats);

// Payment intent creation
router.post("/create-payment-intent", createPaymentIntent);

// Routes with parameters
router.get("/:id", validateBookingId, validate, getBookingById);
router.put(
  "/:id",
  validateBookingId,
  validateNewBooking,
  validate,
  updateBooking
);
router.delete("/:id", validateBookingId, validate, deleteBooking);

module.exports = router;
