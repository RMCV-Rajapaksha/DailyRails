import React, { useState } from "react";
import { MapPin } from "lucide-react";
import axios from "axios";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";

const TrainSchedule = () => {
  const [formData, setFormData] = useState({
    startLocation: "",
    endLocation: "",
    date: "",
  });

  const [scheduleData, setScheduleData] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/trains/search",
        JSON.stringify({
          Location_1: formData.startLocation,
          Location_2: formData.endLocation,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setScheduleData(response.data.data);
      } else {
        console.error("Error fetching train data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching train data:", error);
    }
  };

  return (
    <div className="p-4 mx-auto max-w-7xl">
      {/* Search Section */}
      <div className="mb-6 bg-white rounded-lg shadow">
        <div className="flex flex-wrap gap-2 p-2">
          <div className="flex-1 min-w-[200px] relative">
            <InputField
              id="startLocation"
              value={formData.startLocation}
              onChange={handleInputChange}
              placeholder="Start Location"
              className="w-full py-3 pl-10 pr-4 border rounded"
            />
            <MapPin
              className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
              size={20}
            />
          </div>

          <div className="flex-1 min-w-[200px] relative">
            <InputField
              id="endLocation"
              value={formData.endLocation}
              onChange={handleInputChange}
              placeholder="End Location"
              className="w-full py-3 pl-10 pr-4 border rounded"
            />
            <MapPin
              className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2"
              size={20}
            />
          </div>

          <Button
            onClick={handleSearch}
            className="p-3 text-white rounded-sm bg-primary hover:bg-secondary"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-[#e3f2fd] text-sm">
              <th className="w-8 p-4 text-left">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">TRAIN NAME</th>
              <th className="p-4 text-left">DEPARTS</th>
              <th className="p-4 text-left">ARRIVES</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((train, index) => (
              <tr key={train.ID} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="p-4">{index + 1}</td>
                <td className="p-4">
                  <div className="font-medium">{train.Name}</div>
                  <div className="text-sm text-gray-500">{`${train.StartLocation} - ${train.EndLocation}`}</div>
                </td>
                <td className="p-4">{train.StartTime}</td>
                <td className="p-4">{train.EndTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainSchedule;
