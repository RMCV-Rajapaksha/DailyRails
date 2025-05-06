import React, { useState} from "react";
import {TrainSelection} from "../../tickets/BookingForm/TrainSelection";
import {StationSelection} from "./StationSelection";
import {ClassTypeSelection} from "./ClassTypeSelection";
import {SeatSelection} from "./SeatSelection";
import {ReviewAndPayment} from "./ReviewAndPayment";


const BookingForm = () => {
  const [step, setStep] = useState(1);

  const steps = [
    <StationSelection onNextStep={() => setStep(2)} />,
    <TrainSelection onNextStep={() => setStep(3)} />,
    <ClassTypeSelection onNextStep={() => setStep(4)} />,
    <SeatSelection onNextStep={() => setStep(5)} />,
    // <ReviewAndPayment />,
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {steps[step - 1]}
    </div>
  );
};

export default BookingForm;
