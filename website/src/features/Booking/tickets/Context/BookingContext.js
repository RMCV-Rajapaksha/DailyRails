import React, { createContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({
    startStation: null,
    endStation: null,
    trainId: null,
    trainName: null,
    journeyId: null,
    classType: null,
    seatNumbers: [],
    passengerNic: "", // Consistent naming
    email: "",
    contactNumber: "",
    date: "",
    time: "",
    price: 0,
    totalAmount: 0,
  });

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
