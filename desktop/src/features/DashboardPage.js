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
    <div className={`dashboard-container ${isExpanded ? "expanded" : "collapsed"}`} style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        className="sidebar"
        style={{
          backgroundColor: "#0b1f52", // Darker blue background
          color: "white",
          width: isExpanded ? "250px" : "60px",
          transition: "width 0.3s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="toggle-btn"
          onClick={toggleSidebar}
          style={{
            cursor: "pointer",
            padding: "10px",
            fontSize: "20px",
            color: "white",
          }}
        >
          {isExpanded ? <FaArrowLeft /> : <FaArrowRight />}
        </div>
        <div
          className="logo-container"
          style={{
            backgroundColor: "white", // Add white background for contrast
            borderRadius: "8px",
            padding: "10px",
            margin: "20px 0",
            width: isExpanded ? "80%" : "40px",
            textAlign: "center",
            transition: "width 0.3s ease",
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Logo"
            className="logo"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <nav className="nav-menu" style={{ width: "100%" }}>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <li className="nav-item" style={navItemStyle}>
              <FaCalendarAlt className="icon" />
              {isExpanded && <span style={{ marginLeft: "10px" }}>Schedules</span>}
            </li>
            <li className="nav-item" style={navItemStyle}>
              <FaRoute className="icon" />
              {isExpanded && <span style={{ marginLeft: "10px" }}>Routes</span>}
            </li>
            <li className="nav-item" style={navItemStyle}>
              <FaTicketAlt className="icon" />
              {isExpanded && <span style={{ marginLeft: "10px" }}>Tickets</span>}
            </li>
            <li className="nav-item" style={navItemStyle}>
              <FaUserShield className="icon" />
              {isExpanded && <span style={{ marginLeft: "10px" }}>Manage Admins</span>}
            </li>
            <li className="nav-item" style={navItemStyle}>
              <FaChartBar className="icon" />
              {isExpanded && <span style={{ marginLeft: "10px" }}>Statistics</span>}
            </li>
            <li className="nav-item" style={navItemStyle}>
              <FaBell className="icon" />
              {isExpanded && <span style={{ marginLeft: "10px" }}>Notification Management</span>}
            </li>
            <li className="nav-item" style={navItemStyle}>
              <FaSignOutAlt className="icon" />
              {isExpanded && <span style={{ marginLeft: "10px" }}>Logout</span>}
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className="main-content"
        style={{
          flex: 1,
          backgroundColor: "#f9fafb", // Lighter background for better contrast
          padding: "20px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Enhanced font for better readability
        }}
      >
        <h1 style={{ color: "#1e3a8a", fontSize: "2rem" }}>Dashboard</h1>
        <div
          className="content-box"
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
            border: "1px solid #e5e7eb", // Subtle border for better visual separation
          }}
        >
          <h2 style={{ color: "#333" }}>Welcome Back!</h2>
          <p style={{ color: "#555" }}>Manage schedules, routes, notifications, and more from your dashboard.</p>
        </div>
        <div
          className="dashboard-sections"
          style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
        >
          <div className="section" style={sectionStyle}>
            <h3>Statistics Overview</h3>
            <p>View analytics and reports of your system.</p>
          </div>
          <div className="section" style={sectionStyle}>
            <h3>Manage Notifications</h3>
            <p>Send updates and alerts to users effortlessly.</p>
          </div>
          <div className="section" style={sectionStyle}>
            <h3>Admin Settings</h3>
            <p>Configure user roles and permissions securely.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const navItemStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px 20px",
  width: "100%",
  color: "white",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  fontSize: "16px", // Slightly larger text for better readability
};

const sectionStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  flex: "1 1 calc(33% - 20px)",
  minWidth: "250px",
  border: "1px solid #e5e7eb", // Subtle border for sections
};

export default DashboardPage;
