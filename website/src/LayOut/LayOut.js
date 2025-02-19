import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayOut = () => {
  const location = useLocation();
  const isSeatBooking = location.pathname.startsWith("/seatBooking");

  return (
    <>
      <Navbar />
      {isSeatBooking ? (
        <Outlet />
      ) : (
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default MainLayOut;
