import { createContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({
    trainId: "TR001",
    journeyId: "",
    classType: "1",
    noOfSeats: 1,
    passengerNic: "",
    date: "",
    time: "",
    startStation: { id: "", name: "" },
    endStation: { id: "", name: "" },
    seatNumbers: [],
    amount: 100, // Default amount per seat
  });

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;