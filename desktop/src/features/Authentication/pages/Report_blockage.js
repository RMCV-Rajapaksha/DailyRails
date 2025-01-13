import React, { useState, useEffect } from "react";
import {
  Home,
  Bell,
  BookOpen,
  Calendar,
  Settings,
  Bookmark,
  AlertTriangle,
  Clock,
  MapPin,
  UserSquare,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const ReportTrackBlockagePage = () => {
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      name: "Surasinghe RL OTH",
      nic: "222222222",
      type: "Tree Fallen",
      description: "A tree has fallen on the track near Polgahawela.",
      station: "Polgahawela",
      status: "Pending",
      timestamp: "10 minutes ago",
      severity: "High"
    },
    {
      id: 2,
      name: "Kanchana Perera",
      nic: "123456789",
      type: "Signal Failure",
      description: "Signal at Galle station is malfunctioning.",
      station: "Galle",
      status: "Pending",
      timestamp: "15 minutes ago",
      severity: "Medium"
    },
  ]);

  const [isPopping, setIsPopping] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

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
          timestamp: "Just now",
          severity: "High"
        },
      ]);
      setIsPopping(true);
      setTimeout(() => setIsPopping(false), 1000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const markAsReviewed = (id) => {
    setIncidents((prev) =>
      prev.map((incident) =>
        incident.id === id ? { ...incident, status: "Reviewed" } : incident
      )
    );
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'pending') return incident.status === 'Pending';
    if (selectedFilter === 'reviewed') return incident.status === 'Reviewed';
    return true;
  });

  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: Bell, label: 'Notifications' },
    { icon: BookOpen, label: 'Reports' },
    { icon: Calendar, label: 'Schedule' },
    { icon: Settings, label: 'Settings' },
    { icon: Bookmark, label: 'Bookmarks' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-20 bg-white shadow-lg flex flex-col items-center py-6 space-y-8">
        {menuItems.map(({ icon: Icon, label }) => (
          <div key={label} className="relative group">
            <div className="flex flex-col items-center">
              <Icon 
                className={`w-6 h-6 ${
                  label === 'Notifications' ? 'text-blue-600' : 'text-gray-400'
                } group-hover:text-blue-600 transition-colors cursor-pointer`} 
              />
              {label === 'Notifications' && incidents.filter(i => i.status === 'Pending').length > 0 && (
                <div className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${isPopping ? 'animate-bounce' : ''}`}>
                  {incidents.filter(i => i.status === 'Pending').length}
                </div>
              )}
            </div>
            <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Track Blockage Reports</h1>
              <p className="text-gray-500">Monitor and manage track incidents</p>
            </div>
            
            {/* Filters */}
            <div className="flex space-x-2">
              <button 
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${selectedFilter === 'all' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                All Reports
              </button>
              <button 
                onClick={() => setSelectedFilter('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${selectedFilter === 'pending' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Pending
              </button>
              <button 
                onClick={() => setSelectedFilter('reviewed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${selectedFilter === 'reviewed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                Reviewed
              </button>
            </div>
          </div>

          {/* Incidents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md
                  ${incident.status === 'Reviewed' ? 'opacity-75' : ''}`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{incident.name}</h2>
                      <p className="text-sm text-gray-500 flex items-center">
                        <UserSquare className="w-4 h-4 mr-1" />
                        {incident.nic}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{incident.type}</p>
                        <p className="text-sm text-gray-500">{incident.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {incident.station}
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {incident.timestamp}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => markAsReviewed(incident.id)}
                      className={`w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2 text-sm font-medium transition-colors
                        ${incident.status === "Pending"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-green-50 text-green-700 cursor-not-allowed"}`}
                      disabled={incident.status === "Reviewed"}
                    >
                      {incident.status === "Pending" ? (
                        <>
                          <AlertCircle className="w-4 h-4" />
                          <span>Mark as Reviewed</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Reviewed</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportTrackBlockagePage;