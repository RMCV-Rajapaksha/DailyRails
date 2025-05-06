import React from "react";
import BookingForm from "../tickets/BookingForm/BookingForm";
import { BookingProvider } from "../tickets/Context/BookingContext";

const BookingPage = () => {
  return (
    <BookingProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Train Booking</h1>
        <BookingForm />
      </div>
    </BookingProvider>
  );
};

export default BookingPage;