import React, { useState } from "react";

const ManageTicketPricesPage = () => {
  const [ticketPrices, setTicketPrices] = useState([
    {
      id: 1,
      trainName: "1008 Intercity Express",
      class: "Observation Saloon",
      price: 3000,
    },
    {
      id: 2,
      trainName: "1046 Night Mail",
      class: "Second Class Sleeper",
      price: 5000,
    },
  ]);

  const [form, setForm] = useState({
    id: null,
    trainName: "",
    class: "",
    price: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddTicketPrice = () => {
    const newTicket = { ...form, id: Date.now() };
    setTicketPrices([...ticketPrices, newTicket]);
    setForm({ id: null, trainName: "", class: "", price: "" });
  };

  const handleEditTicketPrice = (ticket) => {
    setForm(ticket);
    setIsEditing(true);
  };

  const handleUpdateTicketPrice = () => {
    setTicketPrices(ticketPrices.map((t) => (t.id === form.id ? form : t)));
    setForm({ id: null, trainName: "", class: "", price: "" });
    setIsEditing(false);
  };

  const handleDeleteTicketPrice = (id) => {
    setTicketPrices(ticketPrices.filter((ticket) => ticket.id !== id));
  };

  // Inline styles
  const containerStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const formStyle = {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  };

  const inputStyle = {
    margin: "10px 0",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
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
      <h1>Manage Train Ticket Prices</h1>

      {/* Add/Edit Form */}
      <div style={formStyle}>
        <h2>{isEditing ? "Edit Ticket Price" : "Add New Ticket Price"}</h2>
        <select
          name="trainName"
          value={form.trainName}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select Train</option>
          <option value="1008 Intercity Express">1008 Intercity Express</option>
          <option value="1046 Night Mail">1046 Night Mail</option>
          <option value="1035 Colombo Express">1035 Colombo Express</option>
        </select>

        <select
          name="class"
          value={form.class}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select Class</option>
          <option value="Observation Saloon">Observation Saloon</option>
          <option value="First Class">First Class</option>
          <option value="Second Class">Second Class</option>
          <option value="Third Class">Third Class</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price (LKR)"
          value={form.price}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          onClick={isEditing ? handleUpdateTicketPrice : handleAddTicketPrice}
          style={buttonStyle}
        >
          {isEditing ? "Update Ticket Price" : "Add Ticket Price"}
        </button>
      </div>

      {/* Ticket Price List */}
      <h2>Current Ticket Prices</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...tableCellStyle, ...headerStyle }}>#</th>
            <th style={{ ...tableCellStyle, ...headerStyle }}>Train Name</th>
            <th style={{ ...tableCellStyle, ...headerStyle }}>Class</th>
            <th style={{ ...tableCellStyle, ...headerStyle }}>Price (LKR)</th>
            <th style={{ ...tableCellStyle, ...headerStyle }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ticketPrices.map((ticket, index) => (
            <tr key={ticket.id}>
              <td style={tableCellStyle}>{index + 1}</td>
              <td style={tableCellStyle}>{ticket.trainName}</td>
              <td style={tableCellStyle}>{ticket.class}</td>
              <td style={tableCellStyle}>{ticket.price}</td>
              <td style={tableCellStyle}>
                <button
                  onClick={() => handleEditTicketPrice(ticket)}
                  style={{ ...buttonStyle, backgroundColor: "#457b9d" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTicketPrice(ticket.id)}
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

export default ManageTicketPricesPage;
