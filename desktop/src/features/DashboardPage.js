import React, { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import SideBar from "./MainAdmin/components/SideBar";


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
  const [section1, setSection] = useState("admins");

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`flex h-screen ${isExpanded ? "expanded" : "collapsed"}`}>
      {/* Sidebar */}
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
        {/* <SideBar section={section1} isExpanded={isExpanded}
        setSection={setSection} /> */}

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

    </div>
    
  );
};

export default DashboardPage;
