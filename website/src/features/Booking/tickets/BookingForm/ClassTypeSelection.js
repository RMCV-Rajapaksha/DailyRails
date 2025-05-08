
import React, { useState, useContext } from "react";
import BookingContext from "../Context/BookingContext";




// Step 3: Class Type Selection
export const ClassTypeSelection = ({ onNextStep }) => {
    const { bookingDetails, setBookingDetails } = useContext(BookingContext);
  
    const handleClassChange = (e) => {
      const classType = e.target.value;
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        classType: classType,
      }));
      onNextStep();
    };
  
    return (
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">Select Class Type:</label>
        <select
          value={bookingDetails.classType}
          onChange={handleClassChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="1">First Class</option>
          <option value="2">Second Class</option>
          <option value="3">Economy Class</option>
        </select>
        <button onClick={onNextStep} className="mt-4 p-2 bg-blue-500 text-white rounded-md">Next</button>
      </div>
    );
  };

