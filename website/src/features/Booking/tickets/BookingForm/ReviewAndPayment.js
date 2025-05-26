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
    passengerNic, // Use consistent naming
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

    // Create booking data object with consistent field names
    const bookingData = {
      trainId,
      journeyId,
      passengerNic, // Use consistent naming throughout
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
    <div className="p-4 bg-white rounded-md shadow">
      <h2 className="mb-4 text-xl font-semibold">Review Your Booking</h2>

      {/* Booking Summary */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium">Journey:</span>
          <span>
            {startStation?.name} to {endStation?.name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Train:</span>
          <span>{bookingDetails.trainName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Class:</span>
          <span>{classType}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Seats:</span>
          <span>{seatNumbers?.join(", ")}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Date:</span>
          <span>{date}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Time:</span>
          <span>{time}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Passenger NIC:</span>
          <span>{passengerNic}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Contact:</span>
          <span>{email}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total Amount:</span>
          <span>${totalAmount}</span>
        </div>
      </div>

      {error && (
        <div className="p-3 mt-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <div className="mt-6 flex flex-col space-y-2">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 disabled:bg-gray-400"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>

        <button
          onClick={onPreviousStep}
          className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300"
          disabled={loading}
        >
          Back to Previous Step
        </button>
      </div>
    </div>
  );
};
