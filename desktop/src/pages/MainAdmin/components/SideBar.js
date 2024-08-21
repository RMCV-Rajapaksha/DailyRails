import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";

import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/Logo-3.png";

const menus = [
  { name: "Schedule", link: "/", icon: MdOutlineDashboard },
  { name: "Routes", link: "/", icon: AiOutlineUser },
  { name: "Ticket", link: "/", icon: FiMessageSquare },
  { name: "Manage Admins", link: "/", icon: TbReportAnalytics, margin: true },
  { name: "Statistics", link: "/", icon: FiFolder },
  { name: "Notification Management", link: "/", icon: FiShoppingCart },
];

function SideBar() {
  // Move useState inside the component
  const [open, setOpen] = useState(true);

  return (
    <section className="flex gap-6 font-body">
      <div
        className={` min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="flex justify-end py-3 text-tertiary">
          {/* <img
            src={Logo}
            className="flex justify-center h-16 item-center ${}"
            alt="Flowbite Logo"
          /> */}
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="relative flex flex-col gap-4 mt-4 ">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:text-primary text-tertiary rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 hover:text-primary ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SideBar;
