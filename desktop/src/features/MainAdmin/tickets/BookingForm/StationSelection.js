import React, { useContext } from "react";
import BookingContext from "../Context/BookingContext";

export const StationSelection = ({ onNextStep }) => {
  const { bookingDetails, setBookingDetails } = useContext(BookingContext);

  const stations = [
    { id: "ST001", name: "Colombo Fort" },
    { id: "ST002", name: "Maradana" },
    { id: "ST012", name: "Anuradhapura" },
    { id: "ST004", name: "Peradeniya" },
    { id: "ST003", name: "Kandy" },
    { id: "ST005", name: "Gampola" },
    { id: "ST017", name: "Hatton" },
    { id: "ST016", name: "Nanuoya" },
    { id: "ST018", name: "Haputale" },
    { id: "ST020", name: "Badulla" },
    { id: "ST006", name: "Panadura" },
    { id: "ST007", name: "Kalutara South" },
    { id: "ST008", name: "Galle" },
    { id: "ST009", name: "Matara" },
    { id: "ST013", name: "Vavuniya" },
    { id: "ST014", name: "Jaffna" },
    { id: "ST015", name: "Kankesanthurai" },
  ];

  const handleStationChange = (e) => {
    const { name, value } = e.target;
    const selectedStation = stations.find((s) => s.id === value);
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
      <button
        onClick={onNextStep}
        disabled={
          !bookingDetails.startStation ||
          !bookingDetails.endStation ||
          bookingDetails.startStation.id === bookingDetails.endStation.id
        }
        className={`mt-4 p-2 ${
          !bookingDetails.startStation ||
          !bookingDetails.endStation ||
          bookingDetails.startStation.id === bookingDetails.endStation.id
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white rounded-md`}
      >
        Next
      </button>

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
