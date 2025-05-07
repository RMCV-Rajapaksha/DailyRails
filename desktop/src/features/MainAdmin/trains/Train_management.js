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
      key: "DepartureTime",
      type: "time",
      data: "",
      placeholder: "Departure Time",
      validation: Joi.string()
        .required()
        .messages({
          "string.empty": "Departure Time should not be empty",
          "any.required": "Departure Time is required",
          "string.type": "Departure Time should be a String",
        }),
    },
  };

  const [newStop, setNewStop] = useState(inputStoppingDataStructure);

  const handleChange = (input) => {
    let input_list = { ...inputs };
    input_list[input.key] = { ...input_list[input.key], data: input.data };
    setInputs(input_list);
  };

  const handleStopChange = (input) => {
    let input_list = { ...newStop };
    input_list[input.key] = { ...input_list[input.key], data: input.data };
    setNewStop(input_list);
  };

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

  const handleSave = async () => {
    const updatedForm = {
      ...form,
      Name: inputs.Name.data,
      TrainID: inputs.TrainID.data,
      StartStations: inputs.StartStations.data,
      EndStations: inputs.EndStations.data,
      StartTime: inputs.StartTime.data,
      EndTime: inputs.EndTime.data,
      stoppingPoints: form.stoppingPoints,
    };

    console.log("Form to save:", updatedForm);

    if (editTrain) {
      try {
        await apiService.put(`/api/trains/${editTrain.TrainID}`, updatedForm);
        console.log("Train updated successfully!");
        toast.success("Train updated successfully!");
        await fetchTrains();
      } catch (error) {
        console.error("Failed to update train. Please try again.");
        toast.error("Failed to update train. Please try again.");
      }
    } else {
      try {
        await apiService.post("/api/trains/", updatedForm);
        console.log("Train added successfully!");
        toast.success("Train added successfully!");
        await fetchTrains();
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
    return () => {
      fetchTrains();
    };
  }, []);

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

  const handleRemove = async (id) => {
    try {
      await apiService.delete(`/api/trains/${id}`);
      console.log("Train removed successfully!");
      toast.success("Train removed successfully!");
      await fetchTrains();
    } catch (error) {
      console.error("Failed to remove train. Please try again.");
      toast.error("Failed to remove train. Please try again.");
    }
  };

  const handleRemoveStop = (index) => {
    setForm((prev) => ({
      ...prev,
      stoppingPoints: prev.stoppingPoints.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Train Management</h1>
          <p className="text-gray-600">Add, edit, and manage train schedules</p>
        </div>

        {/* Form Panel */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-primary border-b pb-3 mb-4">
            {editTrain ? "Edit Train" : "Add New Train"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input input={inputs.Name || ""} handleChange={handleChange} labelClassName="mb-2 font-medium text-gray-700" />
            <Input input={inputs.TrainID || ""} handleChange={handleChange} labelClassName="mb-2 font-medium text-gray-700" />
            <Input input={inputs.StartStations || ""} handleChange={handleChange} labelClassName="mb-2 font-medium text-gray-700" />
            <Input input={inputs.EndStations || ""} handleChange={handleChange} labelClassName="mb-2 font-medium text-gray-700" />
            <Input input={inputs.StartTime || ""} handleChange={handleChange} labelClassName="mb-2 font-medium text-gray-700" />
            <Input input={inputs.EndTime || ""} handleChange={handleChange} labelClassName="mb-2 font-medium text-gray-700" />
          </div>

          {/* Stopping Points */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-primary mb-3">Stopping Points</h3>
            
            {/* Current Stopping Points */}
            {form.stoppingPoints.length > 0 && (
              <div className="mb-4">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Current Stops</h4>
                  <div className="overflow-y-auto max-h-40">
                    {form.stoppingPoints.map((stop, index) => (
                      <div key={index} className="flex items-center justify-between py-2 px-3 border-b last:border-b-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <span className="font-medium">{stop.StationID}</span>
                          <span className="text-sm text-gray-600">
                            Arrival: <span className="font-semibold">{stop.ArrivalTime}</span>
                          </span>
                          <span className="text-sm text-gray-600">
                            Departure: <span className="font-semibold">{stop.DepartureTime}</span>
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveStop(index)}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Add New Stop */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">Add New Stop</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input input={newStop.StationID || ""} handleChange={handleStopChange} labelClassName="mb-2 font-medium text-gray-700" />
                <Input input={newStop.ArrivalTime || ""} handleChange={handleStopChange} labelClassName="mb-2 font-medium text-gray-700" />
                <Input input={newStop.DepartureTime || ""} handleChange={handleStopChange} labelClassName="mb-2 font-medium text-gray-700" />
              </div>
              <button
                onClick={handleAddStop}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150"
              >
                Add Stop
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-150"
            >
              {editTrain ? "Update Train" : "Add Train"}
            </button>
          </div>
        </div>

        {/* Train List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-primary border-b pb-3 mb-4">Train Schedule</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 font-semibold text-gray-700 rounded-tl-lg">Train Name</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Train ID</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Route</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Time</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Stops</th>
                  <th className="py-3 px-4 font-semibold text-gray-700 rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trains.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                      No trains available. Add a new train to get started.
                    </td>
                  </tr>
                ) : (
                  trains.map((train, index) => (
                    <tr 
                      key={train.TrainID} 
                      className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <td className="py-4 px-4 font-medium">{train.Name}</td>
                      <td className="py-4 px-4">{train.TrainID}</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-medium">{train.StartStations}</span>
                          <span className="text-gray-600">to</span>
                          <span className="font-medium">{train.EndStations}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span>{train.StartTime}</span>
                          <span className="text-gray-600">to</span>
                          <span>{train.EndTime}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {train.stoppingPoints.length === 0 ? (
                          <span className="text-gray-500">No stops</span>
                        ) : (
                          <div className="relative">
                            <details className="group">
                              <summary className="list-none cursor-pointer flex items-center">
                                <span className="text-blue-500 font-medium">{train.stoppingPoints.length} stops</span>
                                <svg className="ml-1 w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                              </summary>
                              <div className="mt-2 bg-white shadow-lg rounded-lg border p-2 absolute z-10">
                                <div className="max-h-40 overflow-y-auto">
                                  {train.stoppingPoints.map((stop, i) => (
                                    <div key={i} className="py-1 px-2 border-b last:border-b-0">
                                      <div className="font-medium">{stop.StationID}</div>
                                      <div className="text-sm text-gray-600">
                                        Arr: {stop.ArrivalTime} - Dep: {stop.DepartureTime}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </details>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(train)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleRemove(train.TrainID)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-150"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainManagement;