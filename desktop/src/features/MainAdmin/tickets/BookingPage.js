import React from "react";

import { BookingProvider } from "./BookingProvider";
import BookingForm from "./BookingForm";
import StripePayment from "./StripePayment";

const BookingPage = () => {
  return (
    <BookingProvider>
      <div className=" mx-auto h-screen">
        <h1 className="text-2xl font-bold">Train Booking</h1>
        <BookingForm />
      </div>
    </BookingProvider>
  );
};

export default BookingPage;