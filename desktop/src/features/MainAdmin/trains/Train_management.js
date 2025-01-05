import React, { useState } from "react";

const TrainManagement = () => {
  const [trains, setTrains] = useState([
    {
      id: 1,
      name: "1008 Intercity Express - Badulla - Colombo Fort",
      departure: "10:15",
      arrival: "21:10",
      class: "Observation Saloon",
      availableSeats: 14,
      price: "3000 LKR",
    },
    {
      id: 2,
      name: "1046 Night Mail - Badulla - Colombo Fort",
      departure: "18:00",
      arrival: "05:40",
      class: "Second Class Sleeper",
      availableSeats: 5,
      price: "5000 LKR",
    },
  ]);

  const [editTrain, setEditTrain] = useState(null);
  const [form, setForm] = useState({
    name: "",
    departure: "",
    arrival: "",
    class: "",
    availableSeats: "",
    price: "",
  });

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update train
  const handleSave = () => {
    if (editTrain) {
      setTrains((prev) =>
        prev.map((train) =>
          train.id === editTrain.id ? { ...editTrain, ...form } : train
        )
      );
    } else {
      setTrains((prev) => [
        ...prev,
        { id: Date.now(), ...form, availableSeats: Number(form.availableSeats) },
      ]);
    }
    setForm({
      name: "",
      departure: "",
      arrival: "",
      class: "",
      availableSeats: "",
      price: "",
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
            <th className="py-2 px-4">Departs</th>
            <th className="py-2 px-4">Arrives</th>
            <th className="py-2 px-4">Class</th>
            <th className="py-2 px-4">Available Seats</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train, index) => (
            <tr key={train.id} className="border-b">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{train.name}</td>
              <td className="py-2 px-4">{train.departure}</td>
              <td className="py-2 px-4">{train.arrival}</td>
              <td className="py-2 px-4">{train.class}</td>
              <td className="py-2 px-4">{train.availableSeats}</td>
              <td className="py-2 px-4">{train.price}</td>
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
            name="departure"
            placeholder="Departure Time"
            value={form.departure}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="arrival"
            placeholder="Arrival Time"
            value={form.arrival}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="class"
            placeholder="Class"
            value={form.class}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="availableSeats"
            placeholder="Available Seats"
            value={form.availableSeats}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="p-2 border rounded"
          />
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
