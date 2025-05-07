import React, { useContext, useState } from "react";
import BookingContext from "../Context/BookingContext";

export const PassengerDetailsForm = ({ onNextStep }) => {
  const { bookingDetails, setBookingDetails } = useContext(BookingContext);
  const [errors, setErrors] = useState({});

  const isValidNIC = (nic) => /^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(nic);
  const isValidMobile = (number) => /^07[0-9]{8}$/.test(number);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const newErrors = {};
  
    if (!bookingDetails.date) {
      newErrors.date = "Date is required.";
    }
  
    if (!bookingDetails.passengerNic) {
      newErrors.passengerNic = "NIC is required.";
    } else if (!isValidNIC(bookingDetails.passengerNic)) {
      newErrors.passengerNic = "Invalid NIC format.";
    }
  
    if (!bookingDetails.contactNumber) {
      newErrors.contactNumber = "Contact number is required.";
    } else if (!isValidMobile(bookingDetails.contactNumber)) {
      newErrors.contactNumber = "Invalid mobile number format.";
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setErrors({});
    onNextStep();
  };
  

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Passenger Information</h2>

      <div className="flex flex-col">
        <label className="text-sm font-semibold">Date of Travel:</label>
        <input
          type="date"
          name="date"
          value={bookingDetails.date}
          onChange={handleChange}
          className="px-3 py-2 border rounded-md"
        />
        {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-semibold">NIC Number:</label>
        <input
          type="text"
          name="passengerNic"
          value={bookingDetails.passengerNic}
          onChange={handleChange}
          className="px-3 py-2 border rounded-md"
        />
        {errors.passengerNic && <span className="text-red-500 text-sm">{errors.passengerNic}</span>}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-semibold">Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={bookingDetails.contactNumber || ""}
          onChange={handleChange}
          className="px-3 py-2 border rounded-md"
        />
        {errors.contactNumber && <span className="text-red-500 text-sm">{errors.contactNumber}</span>}
      </div>

      <button
        onClick={handleNext}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
};
