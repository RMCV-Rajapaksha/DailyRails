import React, { createContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({
    trainId: "TR001",
    journeyId: "JY001",
    classType: 1,
    noOfSeats: 2,
    passengerNic: "123456789V",
    date: "2025-02-20",
    time: "10:00",
    seatNumbers: ["A1", "A2"],
    amount: 2000,
  });

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;