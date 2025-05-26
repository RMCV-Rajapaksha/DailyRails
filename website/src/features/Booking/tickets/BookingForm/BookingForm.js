import React, { useState } from "react";
import { TrainSelection } from "../../tickets/BookingForm/TrainSelection";
import { StationSelection } from "./StationSelection";
import { ClassTypeSelection } from "./ClassTypeSelection";
import { SeatSelection } from "./SeatSelection";
import { ReviewAndPayment } from "./ReviewAndPayment";
import { PassengerDetailsForm } from "./PassengerDetailsForm";

const BookingForm = () => {
  const [step, setStep] = useState(1);

  // Updated step titles with new order
  const stepTitles = [
    "Select Stations",
    "Passenger Details", // Moved to 2nd position
    "Select Train",
    "Select Class Type",
    "Select Seats",
    "Review & Payment",
  ];

  const goToNextStep = (nextStep) => {
    setStep(nextStep);
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Updated steps array with new order
  const steps = [
    <StationSelection
      onNextStep={() => goToNextStep(2)}
      onPreviousStep={goToPreviousStep}
    />,
    <PassengerDetailsForm
      onNextStep={() => goToNextStep(3)}
      onPreviousStep={goToPreviousStep}
    />,
    <TrainSelection
      onNextStep={() => goToNextStep(4)}
      onPreviousStep={goToPreviousStep}
    />,
    <ClassTypeSelection
      onNextStep={() => goToNextStep(5)}
      onPreviousStep={goToPreviousStep}
    />,
    <SeatSelection
      onNextStep={() => goToNextStep(6)}
      onPreviousStep={goToPreviousStep}
    />,
    <ReviewAndPayment onPreviousStep={goToPreviousStep} />,
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Step Title */}
      <h2 className="text-2xl font-bold mb-6 text-primary">
        {stepTitles[step - 1]}
      </h2>

      {/* Progress Bar */}
      <div className="mb-8 bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${(step / steps.length) * 100}%` }}
        ></div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mb-8">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                index + 1 <= step
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`text-xs mt-2 text-center ${
                index + 1 <= step
                  ? "text-primary font-semibold"
                  : "text-gray-500"
              }`}
            >
              {title}
            </span>
          </div>
        ))}
      </div>

      {steps[step - 1]}
    </div>
  );
};

export default BookingForm;
