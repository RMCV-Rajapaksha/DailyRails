

import React, { useState, useContext } from "react";
import BookingContext from "../Context/BookingContext";





// Step 4: Seat Selection
export const SeatSelection = ({ onNextStep }) => {
    const { bookingDetails, setBookingDetails } = useContext(BookingContext);
  
    const handleSeatChange = (e) => {
      const seatNumbers = e.target.value.split(", ");
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        seatNumbers: seatNumbers,
      }));
    };
  
    return (
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">Select Seats:</label>
        <input
          type="text"
          name="seatNumbers"
          value={bookingDetails.seatNumbers.join(", ")}
          onChange={handleSeatChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={onNextStep} className="mt-4 p-2 bg-blue-500 text-white rounded-md">Next</button>
      </div>
    );
  };