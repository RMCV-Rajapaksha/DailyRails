import React, { useContext, useState } from "react";
import BookingContext from "../Context/BookingContext";

export const ClassTypeSelection = ({ onNextStep, onPreviousStep }) => {
  const { bookingDetails, setBookingDetails } = useContext(BookingContext);
  const [error, setError] = useState("");

  const classTypes = [
    {
      id: "first",
      name: "First Class",
      price: 1500,
      features: ["Premium Seats", "Air Conditioning", "Complimentary Meals"],
    },
    {
      id: "second",
      name: "Second Class",
      price: 1000,
      features: ["Comfortable Seats", "Air Conditioning", "Window Views"],
    },
    {
      id: "third",
      name: "Third Class",
      price: 500,
      features: ["Standard Seats", "Basic Amenities", "Budget Friendly"],
    },
  ];

  const handleClassTypeChange = (selectedClass) => {
    setBookingDetails((prev) => ({
      ...prev,
      classType: selectedClass.id,
      className: selectedClass.name,
      basePrice: selectedClass.price,
      price: selectedClass.price,
    }));
    setError("");
  };

  const handleContinue = () => {
    if (!bookingDetails.classType) {
      setError("Please select a class type to continue");
      return;
    }
    onNextStep();
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
          <p className="text-sm font-medium text-primary">
            Journey:{" "}
            <span className="text-secondary">
              {bookingDetails.startStation?.name} →{" "}
              {bookingDetails.endStation?.name}
            </span>
          </p>
          <p className="text-sm text-secondary mt-1">
            Train:{" "}
            <span className="font-medium">{bookingDetails.trainName}</span>
          </p>
        </div>
      </div>

      <div>
        <label className="mb-4 text-lg font-semibold text-primary block">
          Choose Your Class:
        </label>

        <div className="grid gap-4 md:grid-cols-3">
          {classTypes.map((classType) => (
            <div
              key={classType.id}
              onClick={() => handleClassTypeChange(classType)}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                bookingDetails.classType === classType.id
                  ? "border-primary bg-gradient-to-r from-primary/10 to-secondary/10 shadow-lg"
                  : "border-gray-300 bg-white hover:border-primary/50 hover:shadow-md"
              }`}
            >
              <div className="text-center">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    bookingDetails.classType === classType.id
                      ? "text-primary"
                      : "text-gray-800"
                  }`}
                >
                  {classType.name}
                </h3>
                <p
                  className={`text-2xl font-bold mb-4 ${
                    bookingDetails.classType === classType.id
                      ? "text-secondary"
                      : "text-gray-600"
                  }`}
                >
                  ${classType.price}
                </p>
                <ul className="text-sm space-y-2">
                  {classType.features.map((feature, index) => (
                    <li
                      key={index}
                      className={`${
                        bookingDetails.classType === classType.id
                          ? "text-secondary"
                          : "text-gray-600"
                      }`}
                    >
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {bookingDetails.classType === classType.id && (
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-white">
                    ✓ Selected
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200 mt-4">
            ⚠️ {error}
          </p>
        )}
      </div>

      {bookingDetails.classType && (
        <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">
            ✓ Class Selected:
          </h4>
          <p className="text-green-700">
            <span className="font-medium">
              {
                classTypes.find((cls) => cls.id === bookingDetails.classType)
                  ?.name
              }
            </span>
            {" - "}
            <span className="font-bold">
              $
              {
                classTypes.find((cls) => cls.id === bookingDetails.classType)
                  ?.price
              }
            </span>
          </p>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={onPreviousStep}
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-300"
        >
          ← Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!bookingDetails.classType}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
            !bookingDetails.classType
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transform hover:scale-105"
          }`}
        >
          Continue to Seat Selection →
        </button>
      </div>
    </div>
  );
};
