import React, { useContext, useState } from "react";
import BookingContext from "../Context/BookingContext";

export const PassengerDetailsForm = ({ onNextStep, onPreviousStep }) => {
  const { bookingDetails, setBookingDetails } = useContext(BookingContext);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // NIC validation
    if (!bookingDetails.passengerNic) {
      newErrors.passengerNic = "NIC is required";
    } else if (bookingDetails.passengerNic.length < 9) {
      newErrors.passengerNic = "NIC must be at least 9 characters";
    }

    // Email validation
    if (!bookingDetails.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(bookingDetails.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Contact number validation
    if (!bookingDetails.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    } else if (
      !/^\d{10}$/.test(bookingDetails.contactNumber.replace(/\D/g, ""))
    ) {
      newErrors.contactNumber = "Please enter a valid 10-digit contact number";
    }

    // Date validation
    if (!bookingDetails.date) {
      newErrors.date = "Travel date is required";
    } else {
      const selectedDate = new Date(bookingDetails.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "Travel date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onNextStep();
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="space-y-6">
      {/* Selected Route Information */}
      {bookingDetails.startStation && bookingDetails.endStation && (
        <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
          <p className="text-sm font-medium text-primary">
            Selected Route:{" "}
            <span className="text-secondary font-semibold">
              {bookingDetails.startStation?.name} →{" "}
              {bookingDetails.endStation?.name}
            </span>
          </p>
        </div>
      )}

      {/* Form Header */}
      <div>
        <h3 className="text-2xl font-bold text-primary mb-2">
          Passenger Details
        </h3>
        <p className="text-secondary">
          Please provide your information before selecting trains and seats
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Passenger NIC */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-primary block">
            Passenger NIC <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="passengerNic"
            value={bookingDetails.passengerNic || ""}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 ${
              errors.passengerNic
                ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
            } focus:outline-none`}
            placeholder="Enter your NIC number (e.g., 123456789V)"
          />
          {errors.passengerNic && (
            <p className="text-red-500 text-sm flex items-center">
              <span className="mr-1">⚠️</span>
              {errors.passengerNic}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-primary block">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={bookingDetails.email || ""}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 ${
              errors.email
                ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
            } focus:outline-none`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm flex items-center">
              <span className="mr-1">⚠️</span>
              {errors.email}
            </p>
          )}
          <p className="text-gray-600 text-sm">
            Booking confirmation will be sent to this email
          </p>
        </div>

        {/* Contact Number */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-primary block">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="contactNumber"
            value={bookingDetails.contactNumber || ""}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 ${
              errors.contactNumber
                ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
            } focus:outline-none`}
            placeholder="Enter your contact number (e.g., 0771234567)"
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-sm flex items-center">
              <span className="mr-1">⚠️</span>
              {errors.contactNumber}
            </p>
          )}
        </div>

        {/* Travel Date */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-primary block">
            Travel Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={bookingDetails.date || ""}
            onChange={handleInputChange}
            min={getMinDate()}
            className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 ${
              errors.date
                ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
            } focus:outline-none`}
          />
          {errors.date && (
            <p className="text-red-500 text-sm flex items-center">
              <span className="mr-1">⚠️</span>
              {errors.date}
            </p>
          )}
          <p className="text-gray-600 text-sm">
            Select your preferred travel date
          </p>
        </div>
      </div>

      {/* Form Summary */}
      {bookingDetails.passengerNic &&
        bookingDetails.email &&
        bookingDetails.contactNumber &&
        bookingDetails.date &&
        !Object.keys(errors).length && (
          <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
            <h4 className="font-bold text-green-800 mb-3 flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Passenger Information Completed
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-green-700">NIC:</span>
                <span className="text-green-800">
                  {bookingDetails.passengerNic}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-green-700">Email:</span>
                <span className="text-green-800">{bookingDetails.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-green-700">Contact:</span>
                <span className="text-green-800">
                  {bookingDetails.contactNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-green-700">Travel Date:</span>
                <span className="text-green-800">
                  {new Date(bookingDetails.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )}

      {/* Important Notice */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2">💡 Next Steps</h4>
        <p className="text-sm text-blue-700">
          After completing your details, you'll be able to search for trains,
          select your class, and choose your seats.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onPreviousStep}
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-300"
        >
          ← Back to Stations
        </button>
        <button
          onClick={handleContinue}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
            Object.keys(errors).length === 0 &&
            bookingDetails.passengerNic &&
            bookingDetails.email &&
            bookingDetails.contactNumber &&
            bookingDetails.date
              ? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transform hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue to Train Selection →
        </button>
      </div>
    </div>
  );
};
