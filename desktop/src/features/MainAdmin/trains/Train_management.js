import React, { useState, useEffect } from "react";
import apiService from "../../../http";
import { toast } from "react-toastify";
import Joi from "joi";
import { Input } from "../components/UI/Input";

const TrainManagement = () => {
  const [trains, setTrains] = useState([]);
  const [editTrain, setEditTrain] = useState(null);
  const [form, setForm] = useState({
    Name: "",
    TrainID: "",
    StartStations: "",
    EndStations: "",
    StartTime: "",
    EndTime: "",
    stoppingPoints: [],
  });

  const inputDataStructure = {
    Name: {
      key: "Name",
      type: "text",
      data: "",
      placeholder: "Name",
      validation: Joi.string()
        .required()
        .messages({
          "string.empty": "Name should not be empty",
          "any.required": "Name is required",
          "string.min": "Name must be at least 1 character",
          "string.max": "Name must be at most 50 characters",
        }),
    },
    TrainID: {
      key: "TrainID",
      type: "text",
      data: "",
      placeholder: "Train ID",
      validation: Joi.string()
        .required()
        .messages({
          "string.empty": "TrainID should not be empty",
          "any.required": "TrainID is required",
        }),
    },
    StartStations: {
      key: "StartStations",
      type: "text",
      data: "",
      placeholder: "Start Station",
      validation: Joi.string()
        .required()
        .messages({
          "string.empty": "Start Station should not be empty",
          "any.required": "Start Station is required",
        }),
    },
    EndStations: {
      key: "EndStations",
      type: "text",
      data: "",
      placeholder: "End Station",
      validation: Joi.string()
        .required()
        .messages({
          "string.empty": "End Station should not be empty",
          "any.required": "End Station is required",
        }),
    },
    StartTime: {
      key: "StartTime",
      type: "time",
      data: "",
      placeholder: "Start Time",
      validation: Joi.string()
        .required()
        .messages({
          "string.empty": "Start Time should not be empty",
          "any.required": "Start Time is required",
          "string.type": "Start Time should be a String",
        }),
    },
    EndTime: {
      key: "EndTime",
      type: "time",
      data: "",
      placeholder: "End Time",
      validation: Joi.string()
        .required()
        .messages({
          "string.empty": "End Time should not be empty",
          "any.required": "End Time is required",
          "string.type": "End Time should be a String",
        }),
    },
  };

  const [inputs, setInputs] = useState(inputDataStructure);

  const inputStoppingDataStructure = {
    StationID: {
      key: "StationID",
      type: "text",
      data: "",
      placeholder: "Station ID",
      validation: Joi.string()
        .required()
        .messages({
          "string.empty": "Station ID should not be empty",
          "any.required": "Station ID is required",
        }),
    },
    ArrivalTime: {
      key: "ArrivalTime",
      type: "time",
      data: "",
      placeholder: "Arrival Time",
      validation: Joi.string()
        .required()
        .messages({
          "string.empty": "Arrival Time should not be empty",
          "any.required": "Arrival Time is required",
          "string.type": "Arrival Time should be a String",
        }),
    },
    DepartureTime: {
      key: "DepatureTime",
      type: "time",
      data: "",
      placeholder: "Depature Time",
      validation: Joi.string()
        .required()
        .messages({
          "string.empty": "Arrival Time should not be empty",
          "any.required": "Arrival Time is required",
          "string.type": "Arrival Time should be a String",
        }),
    },
  };

  const [newStop, setNewStop] = useState(inputStoppingDataStructure);

  const handleChange = (input) => {
    let input_list = { ...inputs };
    input_list[input.key] = input;
    setInputs(input_list);
  };

  // Handle stopping points change
  const handleStopChange = (e) => {
    let input_list = { ...newStop };
    input_list[e.key] = e;
    setNewStop(input_list);
  };

  // Add a stopping point
  const handleAddStop = () => {
    setForm((prev) => ({
      ...prev,
      stoppingPoints: [
        ...prev.stoppingPoints,
        {
          StationID: newStop.StationID.data,
          ArrivalTime: newStop.ArrivalTime.data,
          DepartureTime: newStop.DepartureTime.data,
        },
      ],
    }));
    setNewStop(inputStoppingDataStructure);
  };

  // Add or update train
  const handleSave = async () => {
    const updatedForm = {
      ...form,
      Name: inputs.Name?.data || "",
      TrainID: inputs.TrainID?.data || "",
      StartStations: inputs.StartStations?.data || "",
      EndStations: inputs.EndStations?.data || "",
      StartTime: inputs.StartTime?.data || "",
      EndTime: inputs.EndTime?.data || "",
    };

    console.log("Form to save:", updatedForm);

    if (editTrain) {
      try {
        await apiService.put(`/api/trains/${editTrain.TrainID}`, updatedForm);
        console.log("Train updated successfully!");
        toast.success("Train updated successfully!");
        await fetchTrains(); // Fetch the updated list of trains
      } catch (error) {
        console.error("Failed to update train. Please try again.");
        toast.error("Failed to update train. Please try again.");
      }
    } else {
      try {
        await apiService.post("/api/trains/", updatedForm);
        console.log("Train added successfully!");
        toast.success("Train added successfully!");
        await fetchTrains(); // Fetch the updated list of trains
      } catch (error) {
        console.error("Failed to add train. Please try again.");
        toast.error("Failed to add train. Please try again.");
        console.error(error);
      }
    }

    setForm({
      Name: "",
      TrainID: "",
      StartStations: "",
      EndStations: "",
      StartTime: "",
      EndTime: "",
      stoppingPoints: [],
    });
    setInputs(inputDataStructure);
    setEditTrain(null);
  };

  const fetchTrains = async () => {
    try {
      const response = await apiService.get("/api/trains/");
      setTrains(response.data);
      console.log(response.data);
      console.log("Trains fetched successfully!");
      toast.success("Trains fetched successfully!");
    } catch (error) {
      console.error("Failed to fetch trains. Please try again.");
      toast.error("Failed to fetch trains. Please try again.");
    }
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  // Edit train
  const handleEdit = (train) => {
    setEditTrain(train);
    setForm(train);

    const updatedInputs = {
      Name: { ...inputs.Name, data: train.Name },
      TrainID: { ...inputs.TrainID, data: train.TrainID },
      StartStations: { ...inputs.StartStations, data: train.StartStations },
      EndStations: { ...inputs.EndStations, data: train.EndStations },
      StartTime: { ...inputs.StartTime, data: train.StartTime },
      EndTime: { ...inputs.EndTime, data: train.EndTime },
    };

    setInputs(updatedInputs);
  };

  // Remove train
  const handleRemove = async (id) => {
    try {
      await apiService.delete(`/api/trains/${id}`);
      console.log("Train removed successfully!");
      toast.success("Train removed successfully!");
      await fetchTrains(); // Fetch the updated list of trains
    } catch (error) {
      console.error("Failed to remove train. Please try again.");
      toast.error("Failed to remove train. Please try again.");
    }
  };

  // Remove a stopping point
  const handleRemoveStop = (index) => {
    setForm((prev) => ({
      ...prev,
      stoppingPoints: prev.stoppingPoints.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-primary">Manage Trains</h1>

      {/* Train List */}
      <table className="w-full text-left bg-white rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
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
            <tr key={train.TrainID} className="border-b">
              <td className="py-2 px-4">{train.Name}</td>
              <td className="py-2 px-4">{train.TrainID}</td>
              <td className="py-2 px-4">{train.StartStations}</td>
              <td className="py-2 px-4">{train.EndStations}</td>
              <td className="py-2 px-4">{train.StartTime}</td>
              <td className="py-2 px-4">{train.EndTime}</td>
              <td className="py-2 px-4">
                {train.stoppingPoints.map((stop, i) => (
                  <div key={i}>
                    {stop.StationID} ({stop.ArrivalTime} - {stop.DepartureTime})
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
                  onClick={() => handleRemove(train.TrainID)}
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
          <Input input={inputs.Name || ""} handleChange={handleChange} labelClassName={inputs.Name} />
          <Input input={inputs.TrainID || ""} handleChange={handleChange} labelClassName={inputs.TrainID} />
          <Input input={inputs.StartStations || ""} handleChange={handleChange} labelClassName={inputs.StartStations} />
          <Input input={inputs.EndStations || ""} handleChange={handleChange} labelClassName={inputs.EndStations} />
          <Input input={inputs.StartTime || ""} handleChange={handleChange} labelClassName={inputs.StartTime} />
          <Input input={inputs.EndTime || ""} handleChange={handleChange} labelClassName={inputs.EndTime} />
        </div>

        {/* Stopping Points */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Stopping Points</h3>
          {form.stoppingPoints.map((stop, index) => (
            <div key={index} className="flex items-center space-x-4 mb-2">
              <span>
                {stop.StationID} ({stop.ArrivalTime} - {stop.DepartureTime})
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
            <Input input={newStop.StationID || ""} handleChange={handleStopChange} labelClassName={newStop.StationID} />
            <Input input={newStop.ArrivalTime || ""} handleChange={handleStopChange} labelClassName={newStop.ArrivalTime} />
            <Input input={newStop.DepartureTime || ""} handleChange={handleStopChange} labelClassName={newStop.DepartureTime} />
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