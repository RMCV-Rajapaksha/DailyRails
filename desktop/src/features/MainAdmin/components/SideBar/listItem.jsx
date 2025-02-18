import React from "react";
import { NavLink } from "react-router-dom";

const ListItem = ({ item, isExpanded, isSelected, onClick }) => {
  const getClassList = () => {
    let classList =
      "flex gap-4 flex-row items-center h-10 px-3 rounded-lg hover:bg-gray-100 hover:text-gray-700 w-full ";
    classList += isSelected ? "bg-blue-700 text-white" : "text-blue-100";
    return classList;
  };

  return (
    <li onClick={onClick}>
      <NavLink to={`/dashboard${item.url}`}>
        <span className={getClassList()}>
          {item.icon}
          <h2 className={`capitalize ${!isExpanded && "hidden"}`}>{item.title}</h2>
        </span>
      </NavLink>
    </li>
  );
};

export default ListItem;