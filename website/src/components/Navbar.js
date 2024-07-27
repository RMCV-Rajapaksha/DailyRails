import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const showMenu = () => {
    setMenu(!menu);
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <nav className="bg-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link to="/map" className="text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none font-medium rounded-sm text-sm px-4 py-2 text-center font-body">Map</Link>
          <button onClick={showMenu} data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between ${menu ? 'block' : 'hidden'} w-full md:flex md:w-auto`}>
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            <li>
              <Link to="/" className="block py-2 px-3 md:p-0 text-primary font-body hover:text-secondary">Home</Link>
            </li>
            <li>
              <Link to="/booking" className="block py-2 px-3 md:p-0 text-primary font-body hover:text-secondary">Booking</Link>
            </li>
            <li>
              <Link to="/schedule" className="block py-2 px-3 md:p-0 text-primary font-body hover:text-secondary">Schedule</Link>
            </li>
            <li className="relative">
              <button onClick={toggleDropdown} className="block py-2 px-3 md:p-0 text-primary font-body hover:text-secondary">Lost and Found</button>
              {dropdown && (
                <ul className="absolute bg-white shadow-md rounded mt-2 z-20">
                  <li>
                    <Link to="/lost" className="block px-4 py-2 text-sm text-primary hover:bg-gray-100">Lost Items</Link>
                  </li>
                  <li>
                    <Link to="/found" className="block px-4 py-2 text-sm text-primary hover:bg-gray-100">Found Items</Link>
                  </li>
                  <li>
                    <Link to="/submit" className="block px-4 py-2 text-sm text-primary hover:bg-gray-100">Report</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/contact" className="block py-2 px-3 md:p-0 text-primary font-body hover:text-secondary">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
