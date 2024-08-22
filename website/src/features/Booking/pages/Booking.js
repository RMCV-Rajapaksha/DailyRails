import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";

import train_01 from "../../../assets/images/train_01.jpg";
import train_02 from "../../../assets/images/train_02.jpg";
import train_03 from "../../../assets/images/train_03.jpg";

const images = [train_01, train_02, train_03];

function Booking() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState(0);

  const reset = () => {
    setFrom("");
    setTo("");
    setDate("");
    setSeats(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero */}
      <div className="relative h-screen overflow-hidden text-white bg-gradient-to-r font-body">
        <div className="absolute inset-0">
          <img
            src={images[currentImageIndex]}
            alt="Background Image"
            className="object-cover object-center w-full h-full transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative z-10 flex flex-col items-start justify-center mx-8 mt-48 lg:mx-28 lg:mt-48 h-1/2 p-1/4">
          <h1 className="mb-4 text-6xl font-bold leading-tight text-left">
            DailyRails
          </h1>
          <p className="mb-8 text-lg text-left text-gray-300">
            Online Train Seats Reservation
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center">
        <form className="w-full max-w-lg p-5">
          <InputField
            label="From"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Enter departure station"
            required
          />
          <InputField
            label="To"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter destination station"
            required
          />
          <InputField
            label="Date"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <InputField
            label="Seats"
            type="number"
            id="seats"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            placeholder="Enter number of seats"
            required
          />

          <Button type="submit" className="mr-2">
            Submit
          </Button>
          <Button type="reset" onClick={reset}>
            Reset
          </Button>
        </form>
      </div>
    </>
  );
}

export default Booking;
