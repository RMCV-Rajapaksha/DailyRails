import React from "react";
import { BookingProvider } from "../tickets/Context/BookingContext";
import BookingForm from "../tickets/BookingForm/BookingForm";

const BookingPage = () => {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Train Ticket Booking
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Book your journey with ease. Select your route, choose your seats,
              and secure your tickets in just a few simple steps.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-secondary p-6">
              <h2 className="text-white text-xl font-semibold">
                Complete Your Booking
              </h2>
              <p className="text-blue-100 mt-2">
                Follow the steps below to reserve your train seats
              </p>
            </div>
            <div className="p-6">
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </BookingProvider>
  );
};

export default BookingPage;
