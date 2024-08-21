import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaRoute,
  FaTicketAlt,
  FaUserShield,
  FaChartBar,
  FaBell,
  FaSignOutAlt,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const DashboardPage = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`dashboard-container ${isExpanded ? "expanded" : "collapsed"}`}
    >
      <div className="sidebar">
        <div className="toggle-btn" onClick={toggleSidebar}>
          {" "}
          {isExpanded ? <FaArrowLeft /> : <FaArrowRight />}{" "}
        </div>{" "}
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Logo"
          className="logo"
        />
        <nav className="nav-menu">
          <ul>
            <li>
              {" "}
              <FaCalendarAlt /> <span className="nav-label"> Schedules </span>
            </li>
            <li>
              {" "}
              <FaRoute /> <span className="nav-label"> Routes </span>
            </li>
            <li>
              {" "}
              <FaTicketAlt /> <span className="nav-label"> Tickets </span>
            </li>
            <li>
              {" "}
              <FaUserShield />{" "}
              <span className="nav-label"> Manage Admins </span>
            </li>
            <li>
              {" "}
              <FaChartBar /> <span className="nav-label"> Statistics </span>
            </li>
            <li>
              {" "}
              <FaBell />{" "}
              <span className="nav-label"> Notification Management </span>
            </li>
            <li>
              {" "}
              <FaSignOutAlt /> <span className="nav-label"> Logout </span>
            </li>
          </ul>{" "}
        </nav>{" "}
      </div>{" "}
      <div className="main-content"> {/* Your main content goes here */} </div>{" "}
    </div>
  );
};

export default DashboardPage;
