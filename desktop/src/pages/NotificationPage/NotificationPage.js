import React, { useState } from "react";
import "./NotificationPage.css";
import {
  FaBell,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa"; // Importing required icons

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    // Sample notifications for demonstration
    {
      id: 1,
      title: "System Update",
      description: "System will be down for maintenance at 10 PM.",
    },
    {
      id: 2,
      title: "New Feature",
      description: "New feature XYZ has been added to the system.",
    },
  ]);

  const [isExpanded, setIsExpanded] = useState(true); // State for expanding/compressing sidebar

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
          {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}{" "}
        </div>{" "}
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Logo"
          className="logo"
        />
        <div className="nav-menu">
          <ul>
            <li>
              {" "}
              <FaBell /> <span className="nav-label"> Notifications </span>
            </li>{" "}
            {/* Add other menu items like in your DashboardPage */}{" "}
          </ul>{" "}
        </div>{" "}
      </div>{" "}
      <div className="main-content">
        <h1 className="page-title"> Notifications </h1>{" "}
        <div className="notification-layout">
          <div className="notification-form">
            <div className="input-group">
              <label htmlFor="to"> To </label>{" "}
              <input type="text" id="to" placeholder="Enter recipient" />
            </div>{" "}
            <div className="input-group">
              <label htmlFor="title"> Title </label>{" "}
              <input
                type="text"
                id="title"
                placeholder="Enter notification title"
              />
            </div>{" "}
            <div className="input-group">
              <label htmlFor="description"> Description </label>{" "}
              <textarea
                id="description"
                placeholder="Enter notification description"
              >
                {" "}
              </textarea>{" "}
            </div>{" "}
            <button className="submit-button"> Submit </button>{" "}
          </div>{" "}
          <div className="notifications-list">
            {" "}
            {notifications.map((notification) => (
              <div key={notification.id} className="notification-box">
                <div className="notification-header">
                  <h3> {notification.title} </h3>{" "}
                  <div className="notification-actions">
                    <FaEdit className="action-icon" />
                    <FaTrash className="action-icon" />
                  </div>{" "}
                </div>{" "}
                <p> {notification.description} </p>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default NotificationPage;
