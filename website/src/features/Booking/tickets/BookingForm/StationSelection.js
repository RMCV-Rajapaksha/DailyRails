import React, { useContext } from "react";
import BookingContext from "../Context/BookingContext";

export const StationSelection = ({ onNextStep, onPreviousStep }) => {
  const { bookingDetails, setBookingDetails } = useContext(BookingContext);

  const stations = [
    { id: 1, code: "CMB001", name: "Colombo Fort" },
    { id: 2, code: "KDY002", name: "Kandy" },
    { id: 3, code: "GLE003", name: "Galle" },
    { id: 4, code: "BDL004", name: "Badulla" },
    { id: 5, code: "ANU005", name: "Anuradhapura" },
    { id: 6, code: "MTR006", name: "Matara" },
    { id: 7, code: "JFN007", name: "Jaffna" },
    { id: 8, code: "PLN008", name: "Polonnaruwa" },
    { id: 9, code: "ELL009", name: "Ella" },
    { id: 10, code: "NNO010", name: "Nanu Oya" },
  ];

  const handleStationChange = (e) => {
    const { name, value } = e.target;
    const selectedStation = stations.find((s) => s.id === parseInt(value));
    setBookingDetails((prev) => ({
      ...prev,
      [name]: selectedStation,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Start Station Dropdown */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-semibold text-primary">
          Departure Station:
        </label>
        <select
          name="startStation"
          value={bookingDetails.startStation?.id || ""}
          onChange={handleStationChange}
          className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
        >
          <option value="">Select departure station</option>
          {stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>
      </div>

      {/* End Station Dropdown */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-semibold text-primary">
          Destination Station:
        </label>
        <select
          name="endStation"
          value={bookingDetails.endStation?.id || ""}
          onChange={handleStationChange}
          className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
        >
          <option value="">Select destination station</option>
          {stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>
      </div>

      {/* Route Summary */}
      {bookingDetails.startStation && bookingDetails.endStation && (
        <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
          <h4 className="font-semibold text-primary mb-2">Selected Route:</h4>
          <p className="text-secondary">
            <span className="font-medium">
              {bookingDetails.startStation.name}
            </span>
            <span className="mx-3 text-primary">→</span>
            <span className="font-medium">
              {bookingDetails.endStation.name}
            </span>
          </p>
        </div>
      )}

      {/* Next Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={onNextStep}
          disabled={
            !bookingDetails.startStation ||
            !bookingDetails.endStation ||
            bookingDetails.startStation.id === bookingDetails.endStation.id
          }
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
            !bookingDetails.startStation ||
            !bookingDetails.endStation ||
            bookingDetails.startStation.id === bookingDetails.endStation.id
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transform hover:scale-105"
          }`}
        >
          Continue to Train Selection
        </button>
      </div>

      {/* Error Message */}
      {bookingDetails.startStation?.id === bookingDetails.endStation?.id &&
        bookingDetails.startStation && (
          <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
            ⚠️ Start and end stations cannot be the same
          </p>
        )}
    </div>
  );
};
