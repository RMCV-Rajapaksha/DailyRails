import React, { useState } from "react";

const TrainSchedulesPage = () => {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      Name: "1008 Intercity Express",
      startLocation: "Badulla",
      endLocation: "Colombo Fort",
      departure: "10:15",
      arrival: "21:10",
      days: "Monday, Wednesday, Friday",
    },
    {
      id: 2,
      Name: "1046 Night Mail",
      startLocation: "Badulla",
      endLocation: "Colombo Fort",
      departure: "18:00",
      arrival: "05:40",
      days: "Daily",
    },
  ]);

  const [form, setForm] = useState({
    id: null,
    Name: "",
    startLocation: "",
    endLocation: "",
    departure: "",
    arrival: "",
    days: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add a new schedule
  const handleAddSchedule = () => {
    const newSchedule = { ...form, id: Date.now() };
    setSchedules([...schedules, newSchedule]);
    setForm({ id: null, Name: "", startLocation: "", endLocation: "", departure: "", arrival: "", days: "" });
  };

  // Edit an existing schedule
  const handleEditSchedule = (schedule) => {
    setForm(schedule);
    setIsEditing(true);
  };

  // Update an edited schedule
  const handleUpdateSchedule = () => {
    setSchedules(schedules.map((sch) => (sch.id === form.id ? form : sch)));
    setForm({ id: null, Name: "", startLocation: "", endLocation: "", departure: "", arrival: "", days: "" });
    setIsEditing(false);
  };

  // Delete a schedule
  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Train Schedules</h1>
          <p className="text-gray-600">Manage and view train schedule information</p>
        </div>

        {/* Form Panel */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-primary border-b pb-3 mb-4">
            {isEditing ? "Edit Schedule" : "Add New Schedule"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Train Name</label>
              <input
                type="text"
                name="Name"
                placeholder="Train Name"
                value={form.Name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Start Location</label>
              <input
                type="text"
                name="startLocation"
                placeholder="Start Location"
                value={form.startLocation}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">End Location</label>
              <input
                type="text"
                name="endLocation"
                placeholder="End Location"
                value={form.endLocation}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Departure Time</label>
              <input
                type="time"
                name="departure"
                value={form.departure}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Arrival Time</label>
              <input
                type="time"
                name="arrival"
                value={form.arrival}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Days of Operation</label>
              <input
                type="text"
                name="days"
                placeholder="e.g., Monday, Wednesday, Daily"
                value={form.days}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={isEditing ? handleUpdateSchedule : handleAddSchedule}
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150"
            >
              {isEditing ? "Update Schedule" : "Add Schedule"}
            </button>
          </div>
        </div>

        {/* Schedule List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-primary border-b pb-3 mb-4">Schedule List</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 font-semibold text-gray-700 rounded-tl-lg">#</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Train Name</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Route</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Time</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Days</th>
                  <th className="py-3 px-4 font-semibold text-gray-700 rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                      No schedules available. Add a new schedule to get started.
                    </td>
                  </tr>
                ) : (
                  schedules.map((schedule, index) => (
                    <tr 
                      key={schedule.id} 
                      className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <td className="py-4 px-4">{index + 1}</td>
                      <td className="py-4 px-4 font-medium">{schedule.Name}</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-medium">{schedule.startLocation}</span>
                          <span className="text-gray-600">to</span>
                          <span className="font-medium">{schedule.endLocation}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Dep: <span className="font-medium">{schedule.departure}</span></span>
                          </div>
                          <div className="flex items-center mt-1">
                            <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Arr: <span className="font-medium">{schedule.arrival}</span></span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {schedule.days}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditSchedule(schedule)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSchedule(schedule.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-150"
                          >
                            Delete
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

export default TrainSchedulesPage;