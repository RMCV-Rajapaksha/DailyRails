import React, { useContext, useState } from "react";
import BookingContext from "../Context/BookingContext";

export const ClassTypeSelection = ({ onNextStep, onPreviousStep }) => {
  const { bookingDetails, setBookingDetails } = useContext(BookingContext);
  const [error, setError] = useState("");

  const classTypes = [
    { id: "first", name: "First Class", price: 1500 },
    { id: "second", name: "Second Class", price: 1000 },
    { id: "third", name: "Third Class", price: 500 },
  ];

  const handleClassTypeChange = (e) => {
    const selectedClassId = e.target.value;
    const selectedClass = classTypes.find((cls) => cls.id === selectedClassId);

    if (selectedClass) {
      setBookingDetails((prev) => ({
        ...prev,
        classType: selectedClass.id,
        className: selectedClass.name,
        basePrice: selectedClass.price,
        price: selectedClass.price,
      }));
      setError("");
    }
  };

  const handleContinue = () => {
    if (!bookingDetails.classType) {
      setError("Please select a class type to continue");
      return;
    }
    onNextStep();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Class Type</h3>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-600">
          Journey: {bookingDetails.startStation?.name} to{" "}
          {bookingDetails.endStation?.name}
        </p>
        <p className="text-sm text-gray-600">
          Train: {bookingDetails.trainName}
        </p>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">
          Class Type:
        </label>
        <select
          value={bookingDetails.classType || ""}
          onChange={handleClassTypeChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select class type</option>
          {classTypes.map((classType) => (
            <option key={classType.id} value={classType.id}>
              {classType.name} - ${classType.price}
            </option>
          ))}
        </select>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>

      {bookingDetails.classType && (
        <div className="p-3 bg-blue-50 rounded-md">
          <h4 className="font-medium">Selected Class:</h4>
          <p className="text-sm text-gray-600">
            {
              classTypes.find((cls) => cls.id === bookingDetails.classType)
                ?.name
            }
          </p>
          <p className="text-sm text-gray-600">
            Base Price: $
            {
              classTypes.find((cls) => cls.id === bookingDetails.classType)
                ?.price
            }
          </p>
        </div>
      )}

      <div className="mt-4 flex space-x-4">
        <button
          onClick={onPreviousStep}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!bookingDetails.classType}
          className={`px-4 py-2 ${
            !bookingDetails.classType
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-md`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
