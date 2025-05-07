import React from "react";
import { BookingProvider } from "./BookingProvider";
import BookingForm from "./BookingForm";
import StripePayment from "./StripePayment";

const BookingPage = () => {
  return (
    <BookingProvider>
      <div>
        <h1>Train Booking</h1>
        <BookingForm />
        {/* <StripePayment /> */}
      </div>
    </BookingProvider>
  );
};

export default BookingPage;