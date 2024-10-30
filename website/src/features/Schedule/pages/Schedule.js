import React, { useState } from "react";
import { MapPin, Train, Calendar } from "lucide-react";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";

const TrainSchedule = () => {
  const [formData, setFormData] = useState({
    startLocation: "",
    endLocation: "",
    date: "",
  });

  const [scheduleData] = useState([
    {
      id: 1,
      trainName:
        "1008 Intercity Express - Badulla - Colombo Fort 10:15 - 21:10",
      departs: "10:15",
      arrives: "21:10",
      class: "Observation Saloon",
      available: 14,
      price: "3000 LKR",
    },
    {
      id: 2,
      trainName: "1046 Night Mail - Badulla - Colombo Fort 18:00 - 05:40",
      departs: "02:00",
      arrives: "22:00",
      class: "Second Class Sleeperetts",
      available: 5,
      price: "5000 LKR",
    },
  ]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSearch = () => {
    // Implement search functionality
    console.log("Search with:", formData);
  };

  return (
    <div className="p-4 mx-auto max-w-7xl font-body">
      {/* Search Section */}
      <div className="mb-8 bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-4">
          {/* Start Location */}
          <div className="relative">
            <InputField
              label="Start Location"
              id="startLocation"
              value={formData.startLocation}
              onChange={handleInputChange}
              placeholder="From"
              className="mb-0"
            />
            <MapPin
              className="absolute top-[42px] right-5 text-tertiary"
              size={20}
            />
          </div>

          {/* End Location */}
          <div className="relative">
            <InputField
              label="End Location"
              id="endLocation"
              value={formData.endLocation}
              onChange={handleInputChange}
              placeholder="To"
              className="mb-0"
            />
            <Train
              className="absolute top-[42px] right-5 text-tertiary"
              size={20}
            />
          </div>

          {/* Date */}
          <div className="relative">
            <InputField
              label="Date"
              id="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              className="mb-0"
            />
            <Calendar
              className="absolute top-[42px] right-5 text-tertiary"
              size={20}
            />
          </div>

          {/* Search Button */}
          <div className="flex items-end pb-2.5">
            <Button
              onClick={handleSearch}
              className="items-center justify-center w-full"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-[#E5F0F0]">
              <th className="w-8 p-4 text-left">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="p-4 text-left text-primary">#</th>
              <th className="p-4 text-left text-primary">TRAIN NAME</th>
              <th className="p-4 text-left text-primary">DEPARTS</th>
              <th className="p-4 text-left text-primary">ARRIVES</th>
              <th className="p-4 text-left text-primary">CLASS</th>
              <th className="p-4 text-left text-primary">AVAILABLE</th>
              <th className="p-4 text-left text-primary">PRICE</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((train) => (
              <tr key={train.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="p-4 text-secondary-1">{train.id}</td>
                <td className="p-4 text-secondary-1">{train.trainName}</td>
                <td className="p-4 text-secondary-1">{train.departs}</td>
                <td className="p-4 text-secondary-1">{train.arrives}</td>
                <td className="p-4 text-secondary-1">{train.class}</td>
                <td className="p-4 text-secondary-1">{train.available}</td>
                <td className="p-4 text-secondary-1">{train.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainSchedule;
