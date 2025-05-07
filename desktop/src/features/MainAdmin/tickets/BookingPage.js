import React from "react";

import { BookingProvider } from "../tickets/Context/BookingContext";
import BookingForm from "../tickets/BookingForm/BookingForm";


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