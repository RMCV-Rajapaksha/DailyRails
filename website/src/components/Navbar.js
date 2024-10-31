import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "../assets/images/Logo-3.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(false);

  const menuItems = [
    { title: "Home", path: "/" },
    { title: "Booking", path: "/booking" },
    { title: "Schedule", path: "/schedule" },
    {
      title: "Lost and Found",
      path: "#",
      submenu: [
        { title: "Lost Items", path: "/lost" },
        { title: "Found Items", path: "/found" },
        { title: "Report", path: "/submit" },
      ],
    },
    { title: "Contact Us", path: "/contact" },
    { title: "News", path: "/news" },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
      },
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 w-full bg-white shadow-md"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <Link to="/" className="flex items-center space-x-3">
          <img src={Logo} alt="Logo" className="w-auto h-16" />
        </Link>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:order-2">
          <Link
            to="/map"
            className="px-6 py-2 text-sm font-medium text-white transition-colors duration-200 rounded-sm bg-primary hover:bg-secondary"
          >
            Map
          </Link>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-sm text-primary md:hidden hover:bg-secondary"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 mt-4 font-medium md:p-0 md:space-x-8 md:flex-row md:mt-0">
            {menuItems.map((item, index) => (
              <li key={index} className="relative">
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => setActiveDropdown(!activeDropdown)}
                      className="flex items-center px-3 py-2 text-primary font-body md:p-0 hover:text-secondary"
                    >
                      {item.title}
                      <motion.span
                        animate={{ rotate: activeDropdown ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-1"
                      >
                        <ChevronDown size={16} />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {activeDropdown && (
                        <motion.ul
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={dropdownVariants}
                          className="absolute left-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-lg"
                        >
                          {item.submenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.path}
                                className="block px-4 py-2 text-sm text-primary hover:bg-gray-100"
                              >
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className="block px-3 py-2 text-primary font-body md:p-0 hover:text-secondary"
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="w-full md:hidden"
            >
              <ul className="flex flex-col p-4 mt-4 font-medium border rounded-lg bg-gray-50">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => setActiveDropdown(!activeDropdown)}
                          className="flex items-center justify-between w-full px-3 py-2 text-primary hover:text-secondary"
                        >
                          {item.title}
                          <motion.span
                            animate={{ rotate: activeDropdown ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={16} />
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {activeDropdown && (
                            <motion.ul
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              variants={dropdownVariants}
                              className="px-4 py-2 mt-2 space-y-2 bg-gray-100 rounded-md"
                            >
                              {item.submenu.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <Link
                                    to={subItem.path}
                                    className="block px-3 py-2 text-sm text-primary hover:text-secondary"
                                  >
                                    {subItem.title}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className="block px-3 py-2 text-primary hover:text-secondary"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
