import React, { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import SideBar from "./MainAdmin/components/SideBar";
import Booking from "./MainAdmin/tickets/BookingPage.js";
import RoleRegistration from "../features/Account/Register/RoleRegistration.js";
import Notification from "./MainAdmin/Announcement/Announcement.js";
import TrainSchedule from "./MainAdmin/trains/Train_schedule.js";
import TrainManagement from "./MainAdmin/trains/Train_management.js";
import Home from "./Pages/Home";
import Lost from "./Items/Lost.js";
import Found from "./Items/Found.js";

const DashboardPage = ({ section }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [section1, setSection] = useState("admins");

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`relative flex flex-col bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-xl transition-all duration-300 ease-in-out ${isExpanded ? "w-64" : "w-20"
          }`}
      >
        {/* Toggle Button */}
        <button
          className="absolute -right-4 top-6 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-900 shadow-md hover:bg-gray-100 transition-colors duration-200"
          onClick={toggleSidebar}
        >
          {isExpanded ? (
            <FaArrowLeft className="h-4 w-4" />
          ) : (
            <FaArrowRight className="h-4 w-4" />
          )}
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center p-6">
          <div className={`overflow-hidden rounded-xl bg-white p-2 shadow-inner transition-all duration-300 ${isExpanded ? "w-40" : "w-12"
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
            section={section1}
            isExpanded={isExpanded}
            setSection={setSection}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto bg-gray-50 px-6 py-8">
          <div className="h-full rounded-lg bg-white p-6 shadow-sm">
            {section === "home" && <Home />}
            {section === "schedules" && <TrainSchedule />}
            {section === "trains" && <TrainManagement />}
            {section === "tickets" && <Booking />}
            {section === "admins" && <RoleRegistration />}
            {section === "notifications" && <Notification />}
            {section === "losts" && <Lost />}
            {section === "founds" && <Found />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;