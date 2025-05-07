

import React, { useState, useContext } from "react";
import BookingContext from "../Context/BookingContext";
import SeatBooking from "../SeatBooking";


export const SeatSelection = ({ onNextStep }) => {
  const { bookingDetails, setBookingDetails } = useContext(BookingContext);

  const handleSeatCountChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      seatCount: count,
      seatNumbers: [], // reset previously selected seats if count changes
    }));
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700">Number of Seats:</label>
      <input
        type="number"
        min="1"
        name="seatCount"
        value={bookingDetails.seatCount || ""}
        onChange={handleSeatCountChange}
        className="px-2 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <SeatBooking
        allowedSeats={bookingDetails.seatCount || 0}
        selectedSeats={bookingDetails.seatNumbers}
        setSelectedSeats={(seats) =>
          setBookingDetails((prev) => ({ ...prev, seatNumbers: seats }))
        }
      />

      <button onClick={onNextStep} className="mt-4 p-2 bg-blue-500 text-white rounded-md">
        Next
      </button>
    </div>
  );
};
