import React, { useContext, useState } from "react";
import BookingContext from "../Context/BookingContext";
import apiService from "../../../../http";
import { toast } from "react-toastify";

// Step 5: Review and Payment
export const ReviewAndPayment = () => {
  const { bookingDetails } = useContext(BookingContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  
  const {
    trainId,
    journeyId,
    classType,
    noOfSeats,
    passengerNic,
    contactNumber,
    email,
    date,
    time,
    startStation,
    endStation,
    seatNumbers,
    price,
  } = bookingDetails;

  const totalAmount = seatNumbers.length * price;

  const sendData = async () => {
    if (isSubmitting || isBooked) return;
    
    setIsSubmitting(true);
    
    // Extract numeric part from station IDs or convert to integers if needed
    const extractStationNumber = (stationId) => {
      if (typeof stationId === 'string') {
        // If it's a full station object with ID property
        if (stationId.id) {
          return parseInt(stationId.id.replace(/\D/g, ''));
        }
        // If it's just the ID string
        return parseInt(stationId.replace(/\D/g, ''));
      }
      return stationId;
    };

    const startStationId = startStation && startStation.id ? 
      parseInt(startStation.id.replace(/\D/g, '')) : // Extract digits from "ST003" → 3
      (typeof startStation === 'string' ? parseInt(startStation.replace(/\D/g, '')) : startStation);
      
    const endStationId = endStation && endStation.id ? 
      parseInt(endStation.id.replace(/\D/g, '')) : // Extract digits from "ST001" → 1
      (typeof endStation === 'string' ? parseInt(endStation.replace(/\D/g, '')) : endStation);

    // Format train & journey IDs if needed
    const formattedTrainId = typeof trainId === 'string' && !trainId.match(/^\d+$/) ? 
      parseInt(trainId.replace(/\D/g, '')) : 
      trainId;
      
    const formattedJourneyId = typeof journeyId === 'string' && !journeyId.match(/^\d+$/) ? 
      parseInt(journeyId.replace(/\D/g, '')) : 
      journeyId;
    
    // Convert data to match the backend model field names and types
    const bookingPayload = {
      trainId: formattedTrainId,
      journeyId: formattedJourneyId,
      classType: classType,
      noOfSeats: noOfSeats,
      seatNumbers: seatNumbers,
      price: price,
      totalAmount: totalAmount,
      passengerNic: passengerNic,
      contactNumber: contactNumber,
      email: email,
      startStationId: startStationId, // Now a number
      endStationId: endStationId,     // Now a number
      date: date,
      time: time,
    };

    console.log("Booking payload:", bookingPayload);
  
    try {
      const response = await apiService.post("/api/bookings/newBooking", bookingPayload);
      console.log("Booking response:", response.data);
      toast.success("Booking submitted successfully!");
      setIsBooked(true);
    } catch (error) {
      console.error("Failed to create booking:", error);
      toast.error(error.response?.data?.message || "Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Rest of the component remains unchanged
  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4">Review Your Booking</h2>

      <div className="space-y-2 text-gray-700">
        <p><strong>Train ID:</strong> {trainId}</p>
        <p><strong>Journey ID:</strong> {journeyId}</p>
        <p><strong>Date & Time:</strong> {date} at {time}</p>
        <p><strong>Passenger NIC:</strong> {passengerNic}</p>
        <p><strong>Contact Number:</strong> {contactNumber}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>From:</strong> {startStation?.name}</p>
        <p><strong>To:</strong> {endStation?.name}</p>
        <p><strong>Class:</strong> {classType}</p>
        <p><strong>Seats Requested:</strong> {noOfSeats}</p>
        <p><strong>Seats Selected:</strong> {seatNumbers.join(", ")}</p>
        <p><strong>Price per Seat:</strong> ${price}</p>
        <p className="text-lg font-bold"><strong>Total Amount:</strong> ${totalAmount}</p>
      </div>

      <div className="mt-6">
        {isBooked ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
            <p className="font-bold">Booking Confirmed!</p>
            <p>Your booking has been successfully submitted and confirmed.</p>
          </div>
        ) : (
          <button
            onClick={sendData}
            disabled={isSubmitting}
            className={`${
              isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded-full transition duration-150 ease-in-out`}
          >
            {isSubmitting ? "Processing..." : "Confirm Booking"}
          </button>
        )}
      </div>
    </div>
  );
};