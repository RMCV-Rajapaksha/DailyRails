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

    if (!bookingDetails.passengerNic) {
      newErrors.passengerNic = "NIC is required";
    }
    if (!bookingDetails.email) {
      newErrors.email = "Email is required";
    }
    if (!bookingDetails.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    }
    if (!bookingDetails.date) {
      newErrors.date = "Date is required";
    }
    if (!bookingDetails.time) {
      newErrors.time = "Time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onNextStep();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Passenger Details</h3>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">
          Passenger NIC:
        </label>
        <input
          type="text"
          name="passengerNic"
          value={bookingDetails.passengerNic || ""}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter NIC number"
        />
        {errors.passengerNic && (
          <span className="text-red-500 text-sm">{errors.passengerNic}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">
          Email:
        </label>
        <input
          type="email"
          name="email"
          value={bookingDetails.email || ""}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter email address"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">
          Contact Number:
        </label>
        <input
          type="tel"
          name="contactNumber"
          value={bookingDetails.contactNumber || ""}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter contact number"
        />
        {errors.contactNumber && (
          <span className="text-red-500 text-sm">{errors.contactNumber}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">
          Travel Date:
        </label>
        <input
          type="date"
          name="date"
          value={bookingDetails.date || ""}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.date && (
          <span className="text-red-500 text-sm">{errors.date}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">
          Travel Time:
        </label>
        <input
          type="time"
          name="time"
          value={bookingDetails.time || ""}
          onChange={handleInputChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.time && (
          <span className="text-red-500 text-sm">{errors.time}</span>
        )}
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={onPreviousStep}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
