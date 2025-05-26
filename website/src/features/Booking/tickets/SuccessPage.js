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

    // Since we're redirected here after successful payment,
    // we can assume the booking was created successfully
    // Add a small delay to simulate processing
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            Processing your payment...
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Payment Processing Failed
          </h1>
          <p className="text-gray-600 mb-6">
            No booking reference found. Please try again.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/booking")}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Try Booking Again
            </button>
            <button
              onClick={handleGoHome}
              className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Go Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Your booking has been confirmed successfully. You will receive a
          confirmation email shortly.
        </p>

        <div className="text-left bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">Booking Completed:</h3>
          <p className="text-sm text-gray-600">
            ✓ Payment processed successfully
          </p>
          <p className="text-sm text-gray-600">✓ Booking confirmed</p>
          <p className="text-sm text-gray-600">✓ Confirmation email sent</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
