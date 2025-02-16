import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FiHome, FiBell, FiCalendar, FiSettings } from "react-icons/fi";
import axios from "axios";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
      <Link to="/" className="flex items-center p-2 hover:bg-gray-700 rounded">
        <FiHome className="mr-2" /> Dashboard
      </Link>
      <Link to="/notifications" className="flex items-center p-2 hover:bg-gray-700 rounded">
        <FiBell className="mr-2" /> Notifications
      </Link>
      <Link to="/schedule" className="flex items-center p-2 hover:bg-gray-700 rounded">
        <FiCalendar className="mr-2" /> Train Schedule
      </Link>
      <Link to="/settings" className="flex items-center p-2 hover:bg-gray-700 rounded">
        <FiSettings className="mr-2" /> Settings
      </Link>
    </div>
  );
};

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [trainUpdates, setTrainUpdates] = useState([]);

  useEffect(() => {
    axios.get("/api/reports")
      .then((response) => setReports(response.data))
      .catch((error) => console.error("Error fetching reports", error));

    axios.get("/api/train-updates")
      .then((response) => setTrainUpdates(response.data))
      .catch((error) => console.error("Error fetching train updates", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Report Blockages</h2>
        <ul className="bg-gray-100 p-4 rounded-lg mt-2">
          {reports.length > 0 ? (
            reports.map((report, index) => (
              <li key={index} className="p-2 border-b">{report.message}</li>
            ))
          ) : (
            <p>No blockage reports</p>
          )}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Recent Train Schedule Updates</h2>
        <ul className="bg-gray-100 p-4 rounded-lg mt-2">
          {trainUpdates.length > 0 ? (
            trainUpdates.map((update, index) => (
              <li key={index} className="p-2 border-b">{update.details}</li>
            ))
          ) : (
            <p>No updates available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/notifications" element={<h1>Notifications Page</h1>} />
            <Route path="/schedule" element={<h1>Train Schedule Page</h1>} />
            <Route path="/settings" element={<h1>Settings Page</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
