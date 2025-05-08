
import React, { useState, useContext } from "react";
import BookingContext from "../Context/BookingContext";
import StripePayment from "../StripePayment/CheckoutForm";



// Step 5: Review and Payment
export const ReviewAndPayment = () => {
  const { bookingDetails } = useContext(BookingContext);
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
  } = bookingDetails;

  const totalAmount = seatNumbers.length * bookingDetails.price;

  console.log(bookingDetails);
  
  console.log(trainId);

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4">Review Your Booking</h2>

      <div className="space-y-2 text-gray-700">
        <p><strong>Train ID:</strong> {trainId}</p>
        <p><strong>Journey ID:</strong> {journeyId}</p>
        <p><strong>Date & Time:</strong> {date}</p>
        <p><strong>Passenger NIC:</strong> {passengerNic}</p>
        <p><strong>Contact Number:</strong> {bookingDetails.contactNumber}</p>
        <p><strong>Email:</strong> {bookingDetails.email}</p>
        <p><strong>From:</strong> {startStation.name}</p>
        <p><strong>To:</strong> {endStation.name}</p>
        <p><strong>Class:</strong> {classType}</p>
        <p><strong>Seats Requested:</strong> {noOfSeats}</p>
        <p><strong>Seats Selected:</strong> {seatNumbers.join(", ")}</p>
        <p><strong>Price per Seat:</strong> ${price}</p>
        <p className="text-lg font-bold"><strong>Total Amount:</strong> ${totalAmount}</p>
      </div>

      <div className="mt-6">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      
      >
          Button
       </button>
        {/* <StripePayment totalAmount={totalAmount} /> */}
      </div>
    </div>
  );
};