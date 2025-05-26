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

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Payment routes - IMPORTANT: These must come before other routes
router.post("/create-payment-intent", createPaymentIntent);
router.get("/payment/success", handlePaymentSuccess);

// Booking routes
router.post("/newBooking", newBooking);
router.post("/direct", createBooking);
router.get("/", getBookings);
router.get("/findBookedSeats", findBookedSeats);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;
