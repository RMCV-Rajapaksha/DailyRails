import React from "react";
import { BookingProvider } from "../tickets/Context/BookingContext";
import BookingForm from "../tickets/BookingForm/BookingForm";

const BookingPage = () => {
  return (
    <BookingProvider>
      <div className="max-w-4xl mx-auto p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-8 text-black-700">
          Train Ticket Booking
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <BookingForm />
        </div>
      </div>
    </BookingProvider>
  );
};

export default BookingPage;
