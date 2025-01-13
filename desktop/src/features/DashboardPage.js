import React, { useState } from "react";
import {
  Calendar,
  Route,
  Ticket,
  Shield,
  BarChart,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowUp,
  ArrowDown
} from "lucide-react";

const DashboardPage = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const activityData = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 85 },
    { day: 'Wed', value: 45 },
    { day: 'Thu', value: 90 },
    { day: 'Fri', value: 70 },
    { day: 'Sat', value: 40 },
    { day: 'Sun', value: 55 },
  ];

  const recentActivities = [
    { id: 1, action: "New route added", time: "2 hours ago", status: "success", trend: "up", change: "+12%" },
    { id: 2, action: "Schedule updated", time: "3 hours ago", status: "success", trend: "up", change: "+5%" },
    { id: 3, action: "Ticket resolved", time: "5 hours ago", status: "success", trend: "down", change: "-3%" },
    { id: 4, action: "New admin added", time: "1 day ago", status: "success", trend: "up", change: "+8%" },
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isExpanded ? "w-64" : "w-20"
        } transition-all duration-300 bg-gradient-to-b from-blue-900 to-blue-800 text-white`}
      >
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className={`p-4 hover:bg-blue-700 transition-colors self-${
              isExpanded ? "end" : "center"
            }`}
          >
            {isExpanded ? (
              <ChevronLeft className="text-gray-300 hover:text-white" />
            ) : (
              <ChevronRight className="text-gray-300 hover:text-white" />
            )}
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className={`bg-white rounded-full p-3 ${
              isExpanded ? "w-16 h-16" : "w-12 h-12"
            }`}>
              <img
                src="/api/placeholder/64/64"
                alt="Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2 px-3">
              {menuItems.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <a
                    href="#"
                    className="flex items-center px-4 py-3 text-gray-300 hover:bg-blue-700 rounded-lg transition-colors group"
                  >
                    <Icon className="w-5 h-5 group-hover:text-white" />
                    {isExpanded && (
                      <span className="ml-3 text-sm font-medium">{label}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-600" />
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-medium">JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map(({ title, value, icon: Icon, color, change }) => (
              <div key={title} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center ${change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {change.includes('+') ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    <span className="text-sm ml-1">{change}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-semibold text-gray-900">{value}</p>
                  <p className="text-sm text-gray-500 mt-1">{title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Activity Overview */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Weekly Activity</h2>
            <div className="flex items-end space-x-2 h-64">
              {activityData.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-blue-500 rounded-t-lg transition-all duration-500"
                    style={{ height: `${item.value}%` }}
                  ></div>
                  <div className="text-sm text-gray-600 mt-2">{item.day}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <div className={`flex items-center ${activity.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {activity.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      <span className="text-sm ml-1">{activity.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map(({ title, description, icon: Icon }) => (
                  <div 
                    key={title} 
                    className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                  >
                    <Icon className="w-6 h-6 text-blue-600 mb-2" />
                    <h3 className="text-sm font-medium text-gray-900">{title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const menuItems = [
  { icon: Calendar, label: "Schedules" },
  { icon: Route, label: "Routes" },
  { icon: Ticket, label: "Tickets" },
  { icon: Shield, label: "Manage Admins" },
  { icon: BarChart, label: "Statistics" },
  { icon: Bell, label: "Notification Management" },
  { icon: LogOut, label: "Logout" },
];

const stats = [
  { 
    title: "Total Users", 
    value: "2,847", 
    icon: Users,
    color: "bg-blue-500",
    change: "+12%"
  },
  { 
    title: "Active Routes", 
    value: "42", 
    icon: Route,
    color: "bg-green-500",
    change: "+8%"
  },
  { 
    title: "Open Tickets", 
    value: "15", 
    icon: Ticket,
    color: "bg-yellow-500",
    change: "-3%"
  },
  { 
    title: "Response Time", 
    value: "1.2h", 
    icon: Clock,
    color: "bg-purple-500",
    change: "+2%"
  }
];

const quickActions = [
  {
    title: "Add New Route",
    description: "Create a new transport route",
    icon: Route
  },
  {
    title: "Update Schedule",
    description: "Modify existing schedules",
    icon: Calendar
  },
  {
    title: "View Reports",
    description: "Access analytics data",
    icon: BarChart
  },
  {
    title: "Manage Users",
    description: "Add or modify user access",
    icon: Users
  }
];

export default DashboardPage;