import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBook, FaCalendar, FaCog, FaBookmark } from "react-icons/fa";

const ReportTrackBlockageHistory = () => {
  const navigate = useNavigate();

  const data = [
    {
      name: "Kanchana Perera",
      nic: "123456789",
      type: "Signal Failure",
      description: "The signal at the Polgahawela station is not working",
      station: "Polgahawela",
    },
    {
      name: "Dilani Fernando",
      nic: "123456789",
      type: "Track Obstruction",
      description: "A fallen tree is blocking the track near Nanu Oya station.",
      station: "Nanu Oya",
    },
    {
      name: "Manjula Abeywickrama",
      nic: "123456789",
      type: "Signal Malfunction",
      description:
        "The automated signal system at the Galle station is malfunctioning.",
      station: "Galle",
    },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-body">
      {/* Sidebar */}
      <div className="w-20 bg-white shadow-md flex flex-col items-center py-4">
        <FaHome className="text-2xl mb-6 text-primary cursor-pointer" />
        <FaBook className="text-2xl mb-6 text-gray-500 cursor-pointer" />
        <FaCalendar className="text-2xl mb-6 text-gray-500 cursor-pointer" />
        <FaCog className="text-2xl mb-6 text-gray-500 cursor-pointer" />
        <FaBookmark className="text-2xl text-gray-500 cursor-pointer" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-primary mb-6">
          Report Track Blockage History
        </h1>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md shadow-md mb-6"
        >
          <span className="mr-2">←</span>
          Back
        </button>

        {/* Table */}
        <div className="bg-white rounded-md shadow-md p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left text-gray-600">Name</th>
                <th className="py-2 px-4 text-left text-gray-600">NIC No</th>
                <th className="py-2 px-4 text-left text-gray-600">Type</th>
                <th className="py-2 px-4 text-left text-gray-600">
                  Problem Description
                </th>
                <th className="py-2 px-4 text-left text-gray-600">
                  Nearest Railway Station
                </th>
              </tr>
              <tr>
                <th className="py-2 px-4 text-gray-400">
                  <input
                    type="text"
                    placeholder="Search"
                    className="border border-gray-300 px-2 py-1 rounded"
                  />
                </th>
                <th className="py-2 px-4 text-gray-400">
                  <input
                    type="text"
                    placeholder="Search"
                    className="border border-gray-300 px-2 py-1 rounded"
                  />
                </th>
                <th className="py-2 px-4 text-gray-400"></th>
                <th className="py-2 px-4 text-gray-400"></th>
                <th className="py-2 px-4 text-gray-400"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">{item.nic}</td>
                  <td className="py-2 px-4">{item.type}</td>
                  <td className="py-2 px-4">{item.description}</td>
                  <td className="py-2 px-4">{item.station}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-gray-300 rounded shadow">
                &lt;
              </button>
              <span>1</span>
              <span>of</span>
              <span>16</span>
              <button className="px-3 py-1 bg-gray-300 rounded shadow">
                &gt;
              </button>
            </div>
            <div>
              <select
                className="border border-gray-300 rounded px-2 py-1"
                defaultValue={15}
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportTrackBlockageHistory;
