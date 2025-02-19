import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Calendar,
  Route as RouteIcon,
  Ticket,
  Shield,
  BarChart,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Train,
  Search,
  Package,
  Sun,
  Clock,
  Newspaper,
  CloudRain,
  Users,
  TrendingUp
} from "lucide-react";

const SideBar = ({ section, isExpanded, setSection }) => {
  const menuItems = [
    { title: 'Dashboard', icon: <BarChart className="h-5 w-5" />, path: '/dashboard' },
    { title: 'Train Schedule', icon: <Calendar className="h-5 w-5" />, path: '/dashboard/train-schedule' },
    { title: 'Train Management', icon: <Train className="h-5 w-5" />, path: '/dashboard/train-management' },
    { title: 'Tickets', icon: <Ticket className="h-5 w-5" />, path: '/dashboard/tickets' },
    { title: 'Lost Items', icon: <Search className="h-5 w-5" />, path: '/dashboard/lost' },
    { title: 'Found Items', icon: <Package className="h-5 w-5" />, path: '/dashboard/found' },
    { title: 'Role Registration', icon: <Shield className="h-5 w-5" />, path: '/dashboard/role-registration' },
    { title: 'Notifications', icon: <Bell className="h-5 w-5" />, path: '/dashboard/notifications' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-center py-6">
        {/* Updated logo with better size and white background */}
        <div className="bg-white p-2 rounded-lg shadow-md">
          <img src="/logo.png" alt="Logo" className="h-14 w-auto" />
        </div>
      </div>
      {menuItems.map((item) => (
        <Link key={item.path} to={item.path} className={`group flex items-center rounded-lg px-3 py-2 transition-all duration-200 ${section === item.title.toLowerCase() ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'}`} onClick={() => setSection(item.title.toLowerCase())}>
          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${section === item.title.toLowerCase() ? 'bg-blue-800' : 'bg-blue-900 group-hover:bg-blue-700'}`}>{item.icon}</div>
            <span className={`whitespace-nowrap text-sm font-medium transition-all duration-200 ${!isExpanded && 'hidden'}`}>{item.title}</span>
          </div>
        </Link>
      ))}
      <Link to="/logout" className="mt-auto flex items-center rounded-lg px-3 py-2 text-blue-100 hover:bg-blue-800 transition-all duration-200">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900 group-hover:bg-blue-700">
            <LogOut className="h-5 w-5" />
          </div>
          <span className={`whitespace-nowrap text-sm font-medium transition-all duration-200 ${!isExpanded && 'hidden'}`}>Logout</span>
        </div>
      </Link>
    </div>
  );
};

const DashboardContent = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [weather, setWeather] = useState("Fetching...");
  const [adminCount, setAdminCount] = useState(0);
  const [news, setNews] = useState([]);
  const [metrics, setMetrics] = useState({
    dailyPassengers: 12540,
    onTimePerformance: 94.2,
    activeTrains: 32,
    ticketsSold: 4238
  });

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    fetch("/api/admin-count").then(res => res.json()).then(data => setAdminCount(data.count));
    fetch("/api/news").then(res => res.json()).then(data => setNews(data));
    setWeather("Sunny, 28°C"); // Simulated weather data
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header with date/time and weather */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6 text-blue-700" />
          <p className="text-lg font-medium">{dateTime.toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-md shadow-sm">
          <Sun className="h-6 w-6 text-yellow-500" />
          <p className="text-lg font-medium">{weather}</p>
        </div>
      </div>

      {/* Metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-500 font-medium">Daily Passengers</h3>
            <Users className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{metrics.dailyPassengers.toLocaleString()}</p>
          <p className="text-sm text-green-600 flex items-center mt-2">
            <TrendingUp className="h-4 w-4 mr-1" /> +5.2% from yesterday
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-500 font-medium">On-Time Performance</h3>
            <Clock className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold">{metrics.onTimePerformance}%</p>
          <p className="text-sm text-green-600 flex items-center mt-2">
            <TrendingUp className="h-4 w-4 mr-1" /> +1.7% from last week
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-500 font-medium">Active Trains</h3>
            <Train className="h-5 w-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold">{metrics.activeTrains}</p>
          <p className="text-sm text-gray-500 mt-2">All operating normally</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-amber-500 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-500 font-medium">Tickets Sold Today</h3>
            <Ticket className="h-5 w-5 text-amber-500" />
          </div>
          <p className="text-2xl font-bold">{metrics.ticketsSold.toLocaleString()}</p>
          <p className="text-sm text-green-600 flex items-center mt-2">
            <TrendingUp className="h-4 w-4 mr-1" /> +12.3% from yesterday
          </p>
        </div>
      </div>

      {/* Admin section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-3">
          <Shield className="h-5 w-5 text-indigo-600 mr-2" />
          <h3 className="text-lg font-bold text-gray-800">Admin Overview</h3>
        </div>
        <p className="text-gray-700 py-2 px-3 bg-indigo-50 rounded-md">Currently Active Admins: <span className="font-semibold">{adminCount}</span></p>
      </div>

      {/* News section with improved styling */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 flex items-center border-b pb-2">
          <Newspaper className="h-5 w-5 text-blue-600 mr-2" /> Latest News & Updates
        </h3>
        <ul className="space-y-3">
          {news.length > 0 ? (
            news.map((item, index) => (
              <li key={index} className="flex items-start p-2 hover:bg-gray-50 rounded">
                <div className="flex-shrink-0 bg-blue-100 p-1 rounded-full mr-3 mt-1">
                  <Newspaper className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.date || "Today"}</p>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">No recent news available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

const DashboardPage = ({ section }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentSection, setSection] = useState(section);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className={`relative flex flex-col bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-xl transition-all duration-300 ease-in-out ${isExpanded ? "w-64" : "w-20"}`}>
        <button className="absolute -right-4 top-6 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-900 shadow-md hover:bg-gray-100 transition-colors duration-200" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        <div className="flex-1 overflow-y-auto px-3">
          <SideBar section={currentSection} isExpanded={isExpanded} setSection={setSection} />
        </div>
      </aside>
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto bg-gray-100 px-6 py-8">
          <div className="h-full rounded-lg bg-gray-50 p-6 shadow-sm animate-slide-in">
            {currentSection === "dashboard" ? <DashboardContent /> : <Outlet />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;