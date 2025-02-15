import React from "react";
import { NavLink } from "react-router-dom";

const ListItem = ({ item }) => {
    const getClassList = () => {
        let classList =
            "flex gap-4 flex-row items-center h-10 px-3 rounded-lg  hover:bg-gray-100 hover:text-gray-700 w-full ";
        classList += item.selected ? "bg-gray-400 text-gray-700" : "text-black";
        return classList;
    };

    

    return (
        <li>
            <NavLink to={`/dashboard${item.url}`}>
                <span className={getClassList()}>
                    {item.icon}
                    <h2 className="capitalize">{item.title}</h2>
                </span>
                
            </NavLink>
        </li>
    );
};

export default ListItem;
