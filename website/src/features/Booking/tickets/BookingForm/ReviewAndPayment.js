import React, { useState, useContext } from "react";
import BookingContext from "../Context/BookingContext";
import { useNavigate } from "react-router-dom";

// Step 5: Review and Payment
export const ReviewAndPayment = () => {
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

    // Create booking data object
    const bookingData = {
      trainId,
      journeyId,
      passengerNIC: passengerNic,
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

    try {
      // Send booking data to create payment intent
      const response = await fetch(
        "https://dailyrails.altero.dev//api/bookings/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        setError("Error: No checkout URL returned");
      }
    } catch (error) {
      setError(`Payment processing error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow">
      <h2 className="mb-4 text-xl font-semibold">Review Your Booking</h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Train ID:</strong> {trainId}
        </p>
        <p>
          <strong>Journey ID:</strong> {journeyId}
        </p>
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Time:</strong> {time}
        </p>
        <p>
          <strong>Passenger NIC:</strong> {passengerNic}
        </p>
        <p>
          <strong>Contact Number:</strong> {contactNumber}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>From:</strong> {startStation.name}
        </p>
        <p>
          <strong>To:</strong> {endStation.name}
        </p>
        <p>
          <strong>Class:</strong> {classType}
        </p>
        <p>
          <strong>Seats Selected:</strong> {seatNumbers.join(", ")}
        </p>
        <p>
          <strong>Price per Seat:</strong> ${price}
        </p>
        <p className="text-lg font-bold">
          <strong>Total Amount:</strong> ${totalAmount}
        </p>
      </div>

      {error && (
        <div className="p-3 mt-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <div className="mt-6">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
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
            "Proceed to Payment"
          )}
        </button>
      </div>
    </div>
  );
};
