import React from "react";
import ListItem from "./listItem";
import {
  FaCalendarAlt,
  FaRoute,
  FaTicketAlt,
  FaUserShield,
  FaChartBar,
  FaBell,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

const SideBar = ({ section, isExpanded, setSection }) => {
  const navList = [
    {
      title: "Home",
      url: "/",
      icon: <FaHome className="h-5 w-5" />,
      value: "home",
    },
    {
      title: "Schedules",
      url: "/train-schedule",
      icon: <FaCalendarAlt className="h-5 w-5" />,
      value: "schedules",
    },
    {
      title: "Train Management",
      url: "/train-management",
      icon: <FaCalendarAlt className="h-5 w-5" />,
      value: "train-management",
    },
    {
      title: "Tickets",
      url: "/tickets",
      icon: <FaTicketAlt className="h-5 w-5" />,
      value: "tickets",
    },
    {
      title: "Admins",
      url: "/register",
      icon: <FaUserShield className="h-5 w-5" />,
      value: "admins",
    },
    {
      title: "Notification Management",
      url: "/notifications",
      icon: <FaBell className="h-5 w-5" />,
      value: "notifications",
    },
    {
      title: "Lost",
      url: "/lost",
      icon: <FaBell className="h-5 w-5" />,
      value: "losts",
    },
    {
      title: "Found",
      url: "/found",
      icon: <FaBell className="h-5 w-5" />,
      value: "founds",
    },
    {
      title: "Logout",
      url: "/logout",
      icon: <FaSignOutAlt className="h-5 w-5" />,
      value: "logout",
    },
  ];

  return (
    <div
      className={`flex flex-col items-center bg-blue-900 text-white transition-all duration-300 ${
        isExpanded ? "w-55" : "w-10"
      }`}
    >
      <nav className="w-full">
        <ul className="space-y-4 mb-12 mt-20 w-full">
          {navList.map((item) => (
            <ListItem
              key={item.url}
              item={item}
              isExpanded={isExpanded}
              isSelected={section === item.value}
              onClick={() => setSection(item.value)}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;