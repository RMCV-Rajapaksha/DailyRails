
import React, { useState, useContext } from "react";
import BookingContext from "../Context/BookingContext";
import StripePayment from "../StripePayment/CheckoutForm";



// Step 5: Review and Payment
export const ReviewAndPayment = () => {
  const { bookingDetails } = useContext(BookingContext);
  const totalAmount = bookingDetails.seatNumbers.length * bookingDetails.amount;

  return (
    <div>
      <h2 className="text-xl font-semibold">Review Your Booking</h2>
      <p><strong>Train:</strong> {bookingDetails.trainId}</p>
      <p><strong>Journey:</strong> {bookingDetails.startStation} to {bookingDetails.endStation}</p>
      <p><strong>Class:</strong> {bookingDetails.classType}</p>
      <p><strong>Seats:</strong> {bookingDetails.seatNumbers.join(", ")}</p>
      <p><strong>Total Amount:</strong> ${totalAmount}</p>

      <StripePayment totalAmount={totalAmount} />
    </div>
  );
};