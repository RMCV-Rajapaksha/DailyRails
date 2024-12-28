import React, { useState } from "react";
import apiService from "../../../http";

const TrainManagement = () => {
  const [trains, setTrains] = useState([
    {
      id: 1,
      name: "1008 Intercity Express - Badulla - Colombo Fort",
      TrainID: "IC1008",
      StartStations: "Badulla",
      EndStations: "Colombo Fort",
      StartTime: "10:15",
      EndTime: "21:10",
      stoppingPoints: [
        {
          StationName: "Nanu Oya",
          ArrivalTime: "12:30",
          DepartureTime: "12:35",
        },
        {
          StationName: "Peradeniya",
          ArrivalTime: "16:00",
          DepartureTime: "16:05",
        },
      ],
    },
  ]);

  const [editTrain, setEditTrain] = useState(null);
  const [form, setForm] = useState({
    name: "",
    TrainID: "",
    StartStations: "",
    EndStations: "",
    StartTime: "",
    EndTime: "",
    stoppingPoints: [],
  });

  const [newStop, setNewStop] = useState({
    StationName: "",
    ArrivalTime: "",
    DepartureTime: "",
  });

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle stopping points change
  const handleStopChange = (e) => {
    setNewStop({ ...newStop, [e.target.name]: e.target.value });
  };

  // Add a stopping point
  const handleAddStop = () => {
    setForm((prev) => ({
      ...prev,
      stoppingPoints: [...prev.stoppingPoints, newStop],
    }));
    setNewStop({ StationName: "", ArrivalTime: "", DepartureTime: "" });
  };

  // Remove a stopping point
  const handleRemoveStop = (index) => {
    setForm((prev) => ({
      ...prev,
      stoppingPoints: prev.stoppingPoints.filter((_, i) => i !== index),
    }));
  };

  // Add or update train
  const handleSave = async () => {
    if (editTrain) {
      setTrains((prev) =>
        prev.map((train) =>
          train.id === editTrain.id ? { ...editTrain, ...form } : train
        )
      );
    } else {
      setTrains((prev) => [...prev, { id: Date.now(), ...form }]);
      console.log(form);
      try {
        await apiService.post("/api/trains/", form);
        console.log("Train added successfully!");
      } catch (error) {
        console.error("Failed to add train. Please try again.");
      }
    }
    setForm({
      name: "",
      TrainID: "",
      StartStations: "",
      EndStations: "",
      StartTime: "",
      EndTime: "",
      stoppingPoints: [],
    });
    setEditTrain(null);
  };

  // Edit train
  const handleEdit = (train) => {
    setEditTrain(train);
    setForm(train);
  };

  // Remove train
  const handleRemove = (id) => {
    setTrains((prev) => prev.filter((train) => train.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-primary">Manage Trains</h1>

      {/* Train List */}
      <table className="w-full text-left bg-white rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Train Name</th>
            <th className="py-2 px-4">Train ID</th>
            <th className="py-2 px-4">Start Station</th>
            <th className="py-2 px-4">End Station</th>
            <th className="py-2 px-4">Start Time</th>
            <th className="py-2 px-4">End Time</th>
            <th className="py-2 px-4">Stopping Points</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train, index) => (
            <tr key={train.id} className="border-b">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{train.name}</td>
              <td className="py-2 px-4">{train.TrainID}</td>
              <td className="py-2 px-4">{train.StartStations}</td>
              <td className="py-2 px-4">{train.EndStations}</td>
              <td className="py-2 px-4">{train.StartTime}</td>
              <td className="py-2 px-4">{train.EndTime}</td>
              <td className="py-2 px-4">
                {train.stoppingPoints.map((stop, i) => (
                  <div key={i}>
                    {stop.StationName} ({stop.ArrivalTime} - {stop.DepartureTime})
                  </div>
                ))}
              </td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => handleEdit(train)}
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemove(train.id)}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          {editTrain ? "Edit Train" : "Add Train"}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Train Name"
            value={form.name}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="TrainID"
            placeholder="Train ID"
            value={form.TrainID}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="StartStations"
            placeholder="Start Station"
            value={form.StartStations}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="EndStations"
            placeholder="End Station"
            value={form.EndStations}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="time"
            name="StartTime"
            placeholder="Start Time"
            value={form.StartTime}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="time"
            name="EndTime"
            placeholder="End Time"
            value={form.EndTime}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>

        {/* Stopping Points */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Stopping Points</h3>
          {form.stoppingPoints.map((stop, index) => (
            <div key={index} className="flex items-center space-x-4 mb-2">
              <span>
                {stop.StationName} ({stop.ArrivalTime} - {stop.DepartureTime})
              </span>
              <button
                onClick={() => handleRemoveStop(index)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <input
              type="text"
              name="StationName"
              placeholder="Station Name"
              value={newStop.StationName}
              onChange={handleStopChange}
              className="p-2 border rounded"
            />
            <input
              type="time"
              name="ArrivalTime"
              placeholder="Arrival Time"
              value={newStop.ArrivalTime}
              onChange={handleStopChange}
              className="p-2 border rounded"
            />
            <input
              type="time"
              name="DepartureTime"
              placeholder="Departure Time"
              value={newStop.DepartureTime}
              onChange={handleStopChange}
              className="p-2 border rounded"
            />
          </div>
          <button
            onClick={handleAddStop}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Stop
          </button>
        </div>

        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {editTrain ? "Update Train" : "Add Train"}
        </button>
      </div>
    </div>
  );
};

export default TrainManagement;
