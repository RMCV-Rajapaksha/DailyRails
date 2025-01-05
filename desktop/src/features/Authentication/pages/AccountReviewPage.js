import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/Logo-3.png";

const AccountReviewPage = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-body">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-md">
        <div className="flex justify-center mb-8"> {/* Increased space between logo and text */}
          <img src={logo} alt="DailyRails Logo" className="h-24" /> {/* Increased logo size */}
        </div>
        <h2 className="text-2xl font-bold text-center text-primary mb-8">
          Admin will review and enable your account
        </h2>
        <button
          onClick={handleBackToLogin}
          className="w-full px-4 py-2 text-white bg-primary hover:bg-tertiary rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Back to Login Page
        </button>
      </div>
    </div>
  );
};

export default AccountReviewPage;
