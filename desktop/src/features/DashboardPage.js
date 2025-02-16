import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
<<<<<<< Updated upstream
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import SideBar from "./MainAdmin/components/SideBar";
=======
  Calendar,
  Route as RouteIcon,
  Ticket,
  Shield,
  BarChart,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  CheckCircle
} from "lucide-react";
>>>>>>> Stashed changes


// import LoginPage from "./features/Authentication/pages/LoginPage";
// import SignUpPage from "./features/Authentication/pages/SignUpPage";
import Tickets from "../features/MainAdmin/tickets/Tickets.js";
import RoleRegistration from "../features/Account/Register/RoleRegistration.js";
// import AccountReviewPage from "./features/Authentication/pages/AccountReviewPage";
// import ReportHistory from "./features/Authentication/pages/Report_history";
// import ReportBlockage from "./features/Authentication/pages/Report_blockage";
import NotificationPage from "../features/MainAdmin/Notification/pages/NotificationPage";
// import TrainManagement from "./features/MainAdmin/trains/Train_management.js";
import TrainSchedule from "./MainAdmin/trains/Train_schedule.js";
import TrainManagement from "./MainAdmin/trains/Train_management.js";
import Home from "./Pages/Home";
import Lost from "./Items/Lost.js";
import Found from "./Items/Found.js";



const DashboardPage = ({ section}) => {
  const [isExpanded, setIsExpanded] = useState(true);
<<<<<<< Updated upstream
  const [section1, setSection] = useState("admins");
=======
  const [recentActivities, setRecentActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const activitiesResponse = await fetch("/api/recent-activities");
      const notificationsResponse = await fetch("/api/notifications");
      const statsResponse = await fetch("/api/stats");
>>>>>>> Stashed changes

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
    <div className={`flex h-screen ${isExpanded ? "expanded" : "collapsed"}`}>
      {/* Sidebar */}
<<<<<<< Updated upstream
      <div
        className={`flex flex-col items-center bg-blue-900 text-white transition-all duration-300 ${
          isExpanded ? "w-64" : "w-16"
        }`}
      >
        <div
          className="cursor-pointer p-3 text-2xl"
          onClick={toggleSidebar}
        >
          {isExpanded ? <FaArrowLeft /> : <FaArrowRight />}
        </div>
        <div
          className={`bg-white rounded-lg p-3 my-5 transition-all duration-300 ${
            isExpanded ? "w-4/5" : "w-10"
          }`}
        >
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Logo"
            className="w-full h-auto"
          />
        </div>
        <SideBar section={section1} isExpanded={isExpanded}
        setSection={setSection} />

      </div>
      
      <div className="w-full ">
                    {section === "home" && <Home />}
                    {section === "schedules" && <TrainSchedule />}
                    {section === "trains" && <TrainManagement />}
                    {/* {section === "routes" && < />} */}
                    {section === "tickets" && <Tickets />} 
                    {section === "admins" && <RoleRegistration />} 
                     {/* {section === "statistics" && < />} */}
                     {section === "notifications" && <NotificationPage />} 
                      {section === "losts" && < Lost/>}
                      {section === "founds" && < Found/>}
                     {/* {section === "logout" && <LoginPage />} */}
                  
      </div>

=======
      <div className={`transition-all duration-300 ${isExpanded ? "w-64" : "w-20"} bg-blue-900 text-white`}>
        <button onClick={toggleSidebar} className="p-4 hover:bg-blue-700 transition-colors">
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </button>
        <nav className="mt-6">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <Link to={path} key={label} className="flex items-center px-4 py-3 hover:bg-blue-700">
              <Icon className="w-5 h-5" />
              {isExpanded && <span className="ml-3">{label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* Render dynamic components here */}
        <Outlet />
      </div>
>>>>>>> Stashed changes
    </div>
    
  );
};

<<<<<<< Updated upstream
=======
const menuItems = [
  { icon: Calendar, label: "Schedules", path: "/dashboard/schedules" },
  { icon: RouteIcon, label: "Routes", path: "/dashboard/routes" },
  { icon: Ticket, label: "Tickets", path: "/dashboard/tickets" },
  { icon: Shield, label: "Manage Admins", path: "/dashboard/admins" },
  { icon: BarChart, label: "Statistics", path: "/dashboard/statistics" },
  { icon: Bell, label: "Notifications", path: "/dashboard/notifications" },
  { icon: LogOut, label: "Logout", path: "/dashboard/logout" }
];

>>>>>>> Stashed changes
export default DashboardPage;
