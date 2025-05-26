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
    <div className="space-y-4">
      {/* Start Station Dropdown */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">
          Start Station:
        </label>
        <select
          name="startStation"
          value={bookingDetails.startStation?.id || ""}
          onChange={handleStationChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select start station</option>
          {stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>
      </div>

      {/* End Station Dropdown */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-gray-700">
          End Station:
        </label>
        <select
          name="endStation"
          value={bookingDetails.endStation?.id || ""}
          onChange={handleStationChange}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select end station</option>
          {stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>
      </div>

      {/* Next Button */}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={onNextStep}
          disabled={
            !bookingDetails.startStation ||
            !bookingDetails.endStation ||
            bookingDetails.startStation.id === bookingDetails.endStation.id
          }
          className={`px-4 py-2 ${
            !bookingDetails.startStation ||
            !bookingDetails.endStation ||
            bookingDetails.startStation.id === bookingDetails.endStation.id
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-md`}
        >
          Continue
        </button>
      </div>

      {/* Error Message */}
      {bookingDetails.startStation?.id === bookingDetails.endStation?.id &&
        bookingDetails.startStation && (
          <p className="text-red-500 text-sm">
            Start and end stations cannot be the same
          </p>
        )}
    </div>
  );
};