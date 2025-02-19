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



const Home = () => {
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

}

export default Home