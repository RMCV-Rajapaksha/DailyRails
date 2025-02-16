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
  Menu
} from "lucide-react";

// Sidebar Component
const SideBar = ({ section, isExpanded, setSection }) => {
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <BarChart className="h-5 w-5" />,
      path: '/dashboard',
    },
    {
      title: 'Train Schedule',
      icon: <Calendar className="h-5 w-5" />,
      path: '/dashboard/train-schedule',
    },
    {
      title: 'Train Management',
      icon: <Train className="h-5 w-5" />,
      path: '/dashboard/train-management',
    },
    {
      title: 'Tickets',
      icon: <Ticket className="h-5 w-5" />,
      path: '/dashboard/tickets',
    },
    {
      title: 'Lost Items',
      icon: <Search className="h-5 w-5" />,
      path: '/dashboard/lost',
    },
    {
      title: 'Found Items',
      icon: <Package className="h-5 w-5" />,
      path: '/dashboard/found',
    },
    {
      title: 'Role Registration',
      icon: <Shield className="h-5 w-5" />,
      path: '/dashboard/role-registration',
    },
    {
      title: 'Notifications',
      icon: <Bell className="h-5 w-5" />,
      path: '/dashboard/notifications',
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`group flex items-center rounded-lg px-3 py-2 transition-all duration-200
            ${section === item.title.toLowerCase() 
              ? 'bg-blue-700 text-white' 
              : 'text-blue-100 hover:bg-blue-800'}`}
          onClick={() => setSection(item.title.toLowerCase())}
        >
          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg 
              ${section === item.title.toLowerCase()
                ? 'bg-blue-800'
                : 'bg-blue-900 group-hover:bg-blue-700'}`}
            >
              {item.icon}
            </div>
            
            <span className={`whitespace-nowrap text-sm font-medium
              transition-all duration-200 ${!isExpanded && 'hidden'}`}
            >
              {item.title}
            </span>
          </div>
        </Link>
      ))}

      {/* Logout Button */}
      <Link
        to="/logout"
        className="mt-auto flex items-center rounded-lg px-3 py-2 text-blue-100 hover:bg-blue-800 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900 group-hover:bg-blue-700">
            <LogOut className="h-5 w-5" />
          </div>
          <span className={`whitespace-nowrap text-sm font-medium
            transition-all duration-200 ${!isExpanded && 'hidden'}`}
          >
            Logout
          </span>
        </div>
      </Link>
    </div>
  );
};

// Main Dashboard Component
const DashboardPage = ({ section }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState([]);
  const [currentSection, setSection] = useState(section);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const activitiesResponse = await fetch("/api/recent-activities");
      const notificationsResponse = await fetch("/api/notifications");
      const statsResponse = await fetch("/api/stats");
      
      const activitiesData = await activitiesResponse.json();
      const notificationsData = await notificationsResponse.json();
      const statsData = await statsResponse.json();
      
      setRecentActivities(activitiesData);
      setNotifications(notificationsData);
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`relative flex flex-col bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-xl transition-all duration-300 ease-in-out ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        {/* Toggle Button */}
        <button
          className="absolute -right-4 top-6 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-900 shadow-md hover:bg-gray-100 transition-colors duration-200"
          onClick={toggleSidebar}
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center p-6">
          <div className={`overflow-hidden rounded-xl bg-white p-2 shadow-inner transition-all duration-300 ${
            isExpanded ? "w-40" : "w-12"
          }`}>
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="Logo"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto px-3">
          <SideBar
            section={currentSection}
            isExpanded={isExpanded}
            setSection={setSection}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto bg-gray-50 px-6 py-8">
          <div className="h-full rounded-lg bg-white p-6 shadow-sm">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;