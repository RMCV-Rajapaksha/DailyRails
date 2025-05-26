import React, { useState, useContext } from "react";
import BookingContext from "../Context/BookingContext";
import SeatBooking from "../SeatBooking";

export const SeatSelection = ({ onNextStep, onPreviousStep }) => {
  const { bookingDetails, setBookingDetails } = useContext(BookingContext);
  const [error, setError] = useState("");

  const handleSeatCountChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      seatCount: count,
      seatNumbers: [], // reset previously selected seats if count changes
    }));
    setError(""); // Clear any existing errors
  };

  const handleContinue = () => {
    if (!bookingDetails.seatCount || bookingDetails.seatCount < 1) {
      setError("Please select the number of seats");
      return;
    }

    if (
      !bookingDetails.seatNumbers ||
      bookingDetails.seatNumbers.length === 0
    ) {
      setError("Please select your seats from the seat map");
      return;
    }

    if (bookingDetails.seatNumbers.length !== bookingDetails.seatCount) {
      setError(`Please select exactly ${bookingDetails.seatCount} seat(s)`);
      return;
    }

    setError("");
    onNextStep();
  };

  return (
    <div className="space-y-6">
      {/* Journey Information */}
      <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
        <div className="space-y-1">
          <p className="text-sm font-medium text-primary">
            Journey:{" "}
            <span className="text-secondary font-semibold">
              {bookingDetails.startStation?.name} →{" "}
              {bookingDetails.endStation?.name}
            </span>
          </p>
          <p className="text-sm text-secondary">
            Train:{" "}
            <span className="font-medium">{bookingDetails.trainName}</span>
          </p>
          <p className="text-sm text-secondary">
            Class:{" "}
            <span className="font-medium">{bookingDetails.className}</span>
          </p>
        </div>
      </div>

      {/* Seat Count Selection */}
      <div className="space-y-4">
        <div>
          <label className="text-lg font-semibold text-primary block mb-3">
            Number of Seats:
          </label>
          <input
            type="number"
            min="1"
            max="6"
            name="seatCount"
            value={bookingDetails.seatCount || ""}
            onChange={handleSeatCountChange}
            placeholder="Enter number of seats"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-gray-800"
          />
          <p className="text-sm text-gray-600 mt-2">
            Maximum 6 seats can be booked per transaction
          </p>
        </div>

        {/* Seat Count Confirmation */}
        {bookingDetails.seatCount > 0 && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800 font-medium">
              ✓ Selecting {bookingDetails.seatCount} seat
              {bookingDetails.seatCount > 1 ? "s" : ""}
            </p>
            <p className="text-blue-600 text-sm mt-1">
              Please choose your seats from the seat map below
            </p>
          </div>
        )}
      </div>

      {/* Seat Map */}
      {bookingDetails.seatCount > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">
            Select Your Seats:
          </h3>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <SeatBooking
              allowedSeats={bookingDetails.seatCount || 0}
              selectedSeats={bookingDetails.seatNumbers}
              setSelectedSeats={(seats) =>
                setBookingDetails((prev) => ({ ...prev, seatNumbers: seats }))
              }
            />
          </div>
        </div>
      )}

      {/* Selected Seats Summary */}
      {bookingDetails.seatNumbers && bookingDetails.seatNumbers.length > 0 && (
        <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
          <h4 className="font-bold text-green-800 mb-3 flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Selected Seats
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-green-700">Seat Numbers:</span>
              <span className="text-green-800 font-semibold">
                {bookingDetails.seatNumbers.join(", ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-green-700">Total Seats:</span>
              <span className="text-green-800 font-semibold">
                {bookingDetails.seatNumbers.length}
              </span>
            </div>
            {bookingDetails.price && (
              <div className="flex justify-between border-t border-green-300 pt-2">
                <span className="font-medium text-green-700">
                  Total Amount:
                </span>
                <span className="text-green-600 font-bold text-lg">
                  ${bookingDetails.price * bookingDetails.seatNumbers.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 text-red-700 bg-red-50 rounded-lg border border-red-200">
          <p className="font-medium">⚠️ {error}</p>
        </div>
      )}

      {/* Instructions */}
      {bookingDetails.seatCount > 0 && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-2">
            Seat Selection Guide:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              • <span className="font-medium text-green-600">Green seats</span>{" "}
              - Available for selection
            </li>
            <li>
              • <span className="font-medium text-red-600">Red seats</span> -
              Already booked/unavailable
            </li>
            <li>• Click on available seats to select/deselect them</li>
          </ul>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onPreviousStep}
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-300"
        >
          ← Back to Class Selection
        </button>

        <button
          onClick={handleContinue}
          disabled={
            !bookingDetails.seatCount ||
            !bookingDetails.seatNumbers ||
            bookingDetails.seatNumbers.length === 0 ||
            bookingDetails.seatNumbers.length !== bookingDetails.seatCount
          }
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
            !bookingDetails.seatCount ||
            !bookingDetails.seatNumbers ||
            bookingDetails.seatNumbers.length === 0 ||
            bookingDetails.seatNumbers.length !== bookingDetails.seatCount
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transform hover:scale-105"
          }`}
        >
          Continue to Passenger Details →
        </button>
      </div>
    </div>
  );
};
