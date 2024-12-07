import React, { useState } from "react";

const TrainSchedulesPage = () => {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      trainName: "1008 Intercity Express",
      startLocation: "Badulla",
      endLocation: "Colombo Fort",
      departure: "10:15",
      arrival: "21:10",
      days: "Monday, Wednesday, Friday",
    },
    {
      id: 2,
      trainName: "1046 Night Mail",
      startLocation: "Badulla",
      endLocation: "Colombo Fort",
      departure: "18:00",
      arrival: "05:40",
      days: "Daily",
    },
  ]);

  const [form, setForm] = useState({
    id: null,
    trainName: "",
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
    setForm({ id: null, trainName: "", startLocation: "", endLocation: "", departure: "", arrival: "", days: "" });
  };

  // Edit an existing schedule
  const handleEditSchedule = (schedule) => {
    setForm(schedule);
    setIsEditing(true);
  };

  // Update an edited schedule
  const handleUpdateSchedule = () => {
    setSchedules(schedules.map((sch) => (sch.id === form.id ? form : sch)));
    setForm({ id: null, trainName: "", startLocation: "", endLocation: "", departure: "", arrival: "", days: "" });
    setIsEditing(false);
  };

  // Delete a schedule
  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const containerStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const formStyle = {
    marginBottom: "20px",
  };

  const inputStyle = {
    margin: "5px",
    padding: "8px",
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#1d3557",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const tableStyle = {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
  };

  const tableCellStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  };

  const headerStyle = {
    backgroundColor: "#f0f0f0",
  };

  return (
    <div style={containerStyle}>
      <h1>Manage Train Schedules</h1>

      {/* Add/Edit Schedule Form */}
      <div style={formStyle}>
        <h2>{isEditing ? "Edit Schedule" : "Add New Schedule"}</h2>
        <input
          type="text"
          name="trainName"
          placeholder="Train Name"
          value={form.trainName}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="startLocation"
          placeholder="Start Location"
          value={form.startLocation}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="endLocation"
          placeholder="End Location"
          value={form.endLocation}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="time"
          name="departure"
          placeholder="Departure Time"
          value={form.departure}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="time"
          name="arrival"
          placeholder="Arrival Time"
          value={form.arrival}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="days"
          placeholder="Days of Operation (e.g., Monday, Wednesday)"
          value={form.days}
          onChange={handleChange}
          style={inputStyle}
        />
        <button
          onClick={isEditing ? handleUpdateSchedule : handleAddSchedule}
          style={buttonStyle}
        >
          {isEditing ? "Update Schedule" : "Add Schedule"}
        </button>
      </div>

      {/* Schedule List */}
      <h2>Schedules</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...tableCellStyle, ...headerStyle }}>#</th>
            <th style={{ ...tableCellStyle, ...headerStyle }}>Train Name</th>
            <th style={{ ...tableCellStyle, ...headerStyle }}>Start Location</th>
            <th style={{ ...tableCellStyle, ...headerStyle }}>End Location</th>
            <th style={{ ...tableCellStyle, ...headerStyle }}>Departure</th>
            <th style={{ ...tableCellStyle, ...headerStyle }}>Arrival</th>
            <th style={{ ...tableCellStyle, ...headerStyle }}>Days</th>
            <th style={{ ...tableCellStyle, ...headerStyle }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={schedule.id}>
              <td style={tableCellStyle}>{index + 1}</td>
              <td style={tableCellStyle}>{schedule.trainName}</td>
              <td style={tableCellStyle}>{schedule.startLocation}</td>
              <td style={tableCellStyle}>{schedule.endLocation}</td>
              <td style={tableCellStyle}>{schedule.departure}</td>
              <td style={tableCellStyle}>{schedule.arrival}</td>
              <td style={tableCellStyle}>{schedule.days}</td>
              <td style={tableCellStyle}>
                <button
                  onClick={() => handleEditSchedule(schedule)}
                  style={{ ...buttonStyle, backgroundColor: "#457b9d" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSchedule(schedule.id)}
                  style={{ ...buttonStyle, backgroundColor: "#e63946" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainSchedulesPage;
