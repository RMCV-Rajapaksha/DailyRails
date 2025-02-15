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
        icon: <FaHome />,
        selected: section === "home",
      },
      {
        title: "Schedules",
        url: "/train-schedule",
        icon: <FaCalendarAlt />,
        selected: section === "schedules",
      },{
        title: "Train Management",
        url: "/train-management",
        icon: <FaCalendarAlt />,
        selected: section === "train-management",
      },
      {
        title: "Routes",
        url: "/routes",
        icon: <FaRoute />,
        selected: section === "routes",
      },
      {
        title: "Tickets",
        url: "/tickets",
        icon: <FaTicketAlt />,
        selected: section === "tickets",
      },
      {
        title: "Admins",
        url: "/register",
        icon: <FaUserShield />,
        selected: section === "admins",
      },
      {
        title: "Statistics",
        url: "/statistics",
        icon: <FaChartBar />,
        selected: section === "statistics",
      },
      {
        title: "Notification Management",
        url: "/notification",
        icon: <FaBell />,
        selected: section === "notifications",
      },
      {
        title: "Lost",
        url: "/lost",
        icon: <FaBell />,
        selected: section === "losts",
      },{
        title: "Found",
        url: "/found",
        icon: <FaBell />,
        selected: section === "founds",
      },
      {
        title: "Logout",
        url: "/logout",
        icon: <FaSignOutAlt />,
        selected: section === "logout",
      },
    ];

    return (
      <div
className={`flex flex-col items-center bg-blue-900 text-white transition-all duration-300 ${
  isExpanded ? "w-64" : "w-16"
}`}
>
<nav className="w-full">
    <ul className="space-y-4 mb-12 mt-20 w-full">
            {navList.map((item) => (
                <ListItem key={item.url} item={item}   className={`flex items-center px-4 py-2 w-full cursor-pointer hover:bg-blue-700 transition ${section === item.value ? "bg-blue-700" : ""}`}
                onClick={() => setSection(item.value)}/>

            ))}
        </ul>
</nav>
</div> 



    );
};
export default SideBar;

 
