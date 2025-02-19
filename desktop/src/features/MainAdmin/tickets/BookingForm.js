import React, { useContext } from "react";
import BookingContext from "../tickets/BookingProvider";

const BookingForm = () => {
    
  const { bookingDetails, setBookingDetails } = useContext(BookingContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <form className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">Train ID:</label>
        <input
          type="text"
          name="trainId"
          value={bookingDetails.trainId}
          onChange={handleChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">Journey ID:</label>
        <input
          type="text"
          name="journeyId"
          value={bookingDetails.journeyId}
          onChange={handleChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">Class Type:</label>
        <input
          type="number"
          name="classType"
          value={bookingDetails.classType}
          onChange={handleChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">No of Seats:</label>
        <input
          type="number"
          name="noOfSeats"
          value={bookingDetails.noOfSeats}
          onChange={handleChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">Passenger NIC:</label>
        <input
          type="text"
          name="passengerNic"
          value={bookingDetails.passengerNic}
          onChange={handleChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">Date:</label>
        <input
          type="date"
          name="date"
          value={bookingDetails.date}
          onChange={handleChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">Time:</label>
        <input
          type="time"
          name="time"
          value={bookingDetails.time}
          onChange={handleChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">Seat Numbers:</label>
        <input
          type="text"
          name="seatNumbers"
          value={bookingDetails.seatNumbers.join(", ")}
          onChange={(e) =>
            setBookingDetails((prevDetails) => ({
              ...prevDetails,
              seatNumbers: e.target.value.split(", "),
            }))
          }
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">Amount:</label>
        <input
          type="number"
          name="amount"
          value={bookingDetails.amount}
          onChange={handleChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
};

export default BookingForm;