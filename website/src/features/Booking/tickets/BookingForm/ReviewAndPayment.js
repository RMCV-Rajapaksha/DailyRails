import React, { useState, useContext } from "react";
import BookingContext from "../Context/BookingContext";
import { useNavigate } from "react-router-dom";
import apiService from "../../../../http/index";

export const ReviewAndPayment = ({ onPreviousStep }) => {
  const { bookingDetails } = useContext(BookingContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    trainId,
    journeyId,
    classType,
    noOfSeats,
    passengerNic,
    date,
    time,
    startStation,
    endStation,
    seatNumbers,
    price,
    email,
    contactNumber,
  } = bookingDetails;

  const totalAmount = seatNumbers.length * bookingDetails.price;

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    const bookingData = {
      trainId,
      journeyId,
      passengerNic,
      classType,
      noOfSeats: seatNumbers.length,
      email,
      contactNumber,
      date,
      time,
      startStationId: startStation.id,
      endStationId: endStation.id,
      seatNumbers,
      amount: totalAmount,
    };

    console.log("Sending booking data:", bookingData);

    try {
      const response = await apiService.post(
        "/api/bookings/create-payment-intent",
        bookingData
      );

      if (response.url) {
        window.location.href = response.url;
      } else {
        setError("Error: No checkout URL returned");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      setError(`Payment processing error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Booking Summary Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-2">Booking Summary</h2>
        <p className="text-blue-100">
          Please review your booking details before proceeding to payment
        </p>
      </div>

      {/* Journey Details */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-primary">
            Journey Details
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-medium text-gray-600">Route:</span>
            <span className="text-secondary font-semibold">
              {startStation?.name} → {endStation?.name}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-medium text-gray-600">Train:</span>
            <span className="text-gray-800 font-medium">
              {bookingDetails.trainName}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-medium text-gray-600">Class:</span>
            <span className="text-gray-800 font-medium">{classType}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-medium text-gray-600">Date:</span>
            <span className="text-gray-800 font-medium">{date}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-medium text-gray-600">Time:</span>
            <span className="text-gray-800 font-medium">{time}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="font-medium text-gray-600">Seats:</span>
            <span className="text-gray-800 font-medium">
              {seatNumbers?.join(", ")}
            </span>
          </div>
        </div>
      </div>

      {/* Passenger Details */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-primary">
            Passenger Information
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-medium text-gray-600">NIC:</span>
            <span className="text-gray-800 font-medium">{passengerNic}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="font-medium text-gray-600">Contact:</span>
            <span className="text-gray-800 font-medium">{email}</span>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 overflow-hidden">
        <div className="bg-green-200 px-6 py-4 border-b border-green-300">
          <h3 className="text-lg font-semibold text-green-800">
            Payment Summary
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center py-2">
            <span className="font-medium text-green-700">Price per seat:</span>
            <span className="text-green-800 font-semibold">${price}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="font-medium text-green-700">Number of seats:</span>
            <span className="text-green-800 font-semibold">
              {seatNumbers.length}
            </span>
          </div>
          <div className="border-t border-green-300 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-green-800">
                Total Amount:
              </span>
              <span className="text-2xl font-bold text-green-600">
                ${totalAmount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 text-red-700 bg-red-50 rounded-lg border border-red-200">
          <p className="font-medium">⚠️ Payment Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      <div className="flex justify-between pt-6">
        <button
          onClick={onPreviousStep}
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-300"
          disabled={loading}
        >
          ← Back to Passenger Details
        </button>

        <button
          className="px-8 py-3 font-bold text-white bg-gradient-to-r from-primary to-secondary rounded-lg hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            `Proceed to Payment ($${totalAmount}) →`
          )}
        </button>
      </div>
    </div>
  );
};
