import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    const ref = searchParams.get("ref");

    if (!ref) {
      setStatus("error");
      return;
    }

    setTimeout(() => {
      setStatus("success");
    }, 2000);
  }, [searchParams]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleViewBookings = () => {
    navigate("/my-bookings");
  };

  if (status === "processing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg text-secondary font-medium">
            Processing your payment...
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
          <div className="text-red-500 text-6xl mb-6">❌</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Payment Processing Failed
          </h1>
          <p className="text-secondary mb-8">
            No booking reference found. Please try again.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/booking")}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Try Booking Again
            </button>
            <button
              onClick={handleGoHome}
              className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
            >
              Go Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto p-8 bg-white rounded-xl shadow-xl">
        <div className="text-green-500 text-6xl mb-6">✅</div>
        <h1 className="text-3xl font-bold text-primary mb-4">
          Payment Successful!
        </h1>
        <p className="text-secondary mb-8 text-lg">
          Your booking has been confirmed successfully. You will receive a confirmation email shortly.
        </p>

        <div className="text-left bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg mb-8 border border-green-200">
          <h3 className="font-bold text-green-800 mb-4 text-center">✓ Booking Completed</h3>
          <div className="space-y-2">
            <p className="text-sm text-green-700 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Payment processed successfully
            </p>
            <p className="text-sm text-green-700 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Booking confirmed
            </p>
            <p className="text-sm text-green-700 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Confirmation email sent
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleViewBookings}
            className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
          >
            View My Bookings
          </button>
          <button
            onClick={handleGoHome}
            className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;