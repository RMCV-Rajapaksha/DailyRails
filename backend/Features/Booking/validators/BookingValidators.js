const { body, param, query } = require("express-validator");

const validateNewBooking = [
  body("trainId")
    .isString()
    .withMessage("Train ID must be a string")
    .isLength({ min: 1 })
    .withMessage("Train ID is required"),

  body("journeyId")
    .isString()
    .withMessage("Journey ID must be a string")
    .isLength({ min: 1 })
    .withMessage("Journey ID is required"),

  body("classType")
    .isString()
    .withMessage("Class Type must be a string")
    .isLength({ min: 1 })
    .withMessage("Class Type is required"),

  body("noOfSeats")
    .isInt({ min: 1 })
    .withMessage("Number of seats must be an integer greater than 0"),

  body("passengerNic")
    .isString()
    .withMessage("Passenger NIC must be a string")
    .isLength({ min: 1 })
    .withMessage("Passenger NIC is required"),

  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("date")
    .isISO8601()
    .withMessage("Date must be a valid date"),

  body("time")
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage("Time must be in the format HH:MM:SS"),

  body("seatNumbers")
    .isArray({ min: 1 })
    .withMessage("Seat numbers must be an array with at least one seat number"),

  body("amount")
    .isFloat({ min: 0 })
    .withMessage("Amount must be a positive number"),
];

const validateBookingId = [
  param("id").isString().withMessage("Booking ID must be a string"),
];

module.exports = {
  validateNewBooking,
  validateBookingId,
};