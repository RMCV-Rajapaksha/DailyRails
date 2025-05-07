import { createContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({
    trainId: "",
    journeyId: "",
    classType: "1",
    noOfSeats: 1,
    passengerNic: "",
    contactNumber: "",
    date: "",
    time: "",
    startStation: { id: "", name: "" },
    endStation: { id: "", name: "" },
    seatNumbers: [],
    price: "", // Default amount per seat
    
  });

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;