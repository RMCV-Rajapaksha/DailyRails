import React, { useState, useEffect } from "react";
import { FaHome, FaBell, FaBook, FaCalendar, FaCog, FaBookmark } from "react-icons/fa";

const ReportTrackBlockagePage = () => {
  // Sample data for incidents
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      name: "Surasinghe RL OTH",
      nic: "222222222",
      type: "Tree Fallen",
      description: "A tree has fallen on the track near Polgahawela.",
      station: "Polgahawela",
      status: "Pending",
    },
    {
      id: 2,
      name: "Kanchana Perera",
      nic: "123456789",
      type: "Signal Failure",
      description: "Signal at Galle station is malfunctioning.",
      station: "Galle",
      status: "Pending",
    },
  ]);

  const [isPopping, setIsPopping] = useState(false);

  // Simulate a new emergency notification
  useEffect(() => {
    const timer = setTimeout(() => {
      setIncidents((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: "Dilani Fernando",
          nic: "987654321",
          type: "Track Obstruction",
          description: "A boulder is obstructing the track near Ella.",
          station: "Ella",
          status: "Pending",
        },
      ]);
      // Trigger the popping animation
      setIsPopping(true);

      // Remove the animation effect after 1 second
      setTimeout(() => setIsPopping(false), 1000);
    }, 5000); // Simulate a new notification after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const markAsReviewed = (id) => {
    setIncidents((prev) =>
      prev.map((incident) =>
        incident.id === id ? { ...incident, status: "Reviewed" } : incident
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-body">
      {/* Sidebar */}
      <div className="w-20 bg-white shadow-md flex flex-col items-center py-4 relative">
        <FaHome className="text-2xl mb-6 text-primary cursor-pointer" />
        <div className="relative">
          {/* Bell Icon for Notifications */}
          <FaBell className="text-2xl mb-6 text-primary cursor-pointer" />
          {/* Emergency Notification Badge */}
          <div
            className={`absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform ${
              isPopping ? "animate-pop" : ""
            }`}
          >
            {incidents.filter((incident) => incident.status === "Pending").length}
          </div>
        </div>
        <FaBook className="text-2xl mb-6 text-gray-500 cursor-pointer" />
        <FaCalendar className="text-2xl mb-6 text-gray-500 cursor-pointer" />
        <FaCog className="text-2xl mb-6 text-gray-500 cursor-pointer" />
        <FaBookmark className="text-2xl text-gray-500 cursor-pointer" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-primary mb-6">
          Report Track Blockage
        </h1>

        {/* Emergency Incidents Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="bg-red-500 rounded-lg p-6 shadow-md text-white"
            >
              <h2 className="text-lg font-bold">{incident.name}</h2>
              <p className="text-sm mb-2">NIC: {incident.nic}</p>
              <p className="text-sm mb-2">
                <strong>Type:</strong> {incident.type}
              </p>
              <p className="text-sm mb-2">
                <strong>Description:</strong> {incident.description}
              </p>
              <p className="text-sm mb-2">
                <strong>Station:</strong> {incident.station}
              </p>
              <button
                onClick={() => markAsReviewed(incident.id)}
                className={`w-full py-2 rounded-md shadow-md ${
                  incident.status === "Pending"
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-gray-400 text-gray-800 cursor-not-allowed"
                }`}
                disabled={incident.status === "Reviewed"}
              >
                {incident.status === "Pending" ? "Mark as Reviewed" : "Reviewed"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportTrackBlockagePage;
