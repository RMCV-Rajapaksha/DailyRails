import React, { useState } from "react";
import { TrainSelection } from "../../tickets/BookingForm/TrainSelection";
import { StationSelection } from "./StationSelection";
import { ClassTypeSelection } from "./ClassTypeSelection";
import { SeatSelection } from "./SeatSelection";
import { ReviewAndPayment } from "./ReviewAndPayment";
import { PassengerDetailsForm } from "./PassengerDetailsForm";

const BookingForm = () => {
  const [step, setStep] = useState(1);

  const stepTitles = [
    "Select Stations",
    "Select Train",
    "Select Class Type",
    "Select Seats",
    "Passenger Details",
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

  const steps = [
    <StationSelection
      onNextStep={() => goToNextStep(2)}
      onPreviousStep={goToPreviousStep}
    />,
    <TrainSelection
      onNextStep={() => goToNextStep(3)}
      onPreviousStep={goToPreviousStep}
    />,
    <ClassTypeSelection
      onNextStep={() => goToNextStep(4)}
      onPreviousStep={goToPreviousStep}
    />,
    <SeatSelection
      onNextStep={() => goToNextStep(5)}
      onPreviousStep={goToPreviousStep}
    />,
    <PassengerDetailsForm
      onNextStep={() => goToNextStep(6)}
      onPreviousStep={goToPreviousStep}
    />,
    <ReviewAndPayment onPreviousStep={goToPreviousStep} />,
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {stepTitles[step - 1]}
      </h2>
      <div className="mb-4 bg-gray-100 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(step / steps.length) * 100}%` }}
        ></div>
      </div>
      {steps[step - 1]}
    </div>
  );
};

export default BookingForm;
