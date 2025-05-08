import React from "react";
import { Link } from "react-router-dom";

function Cancle() {
  return (
    <div className="max-w-3xl p-5 mx-auto">
      <div className="p-8 mb-5 text-center bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="mb-5 text-6xl text-red-600">✕</div>
        <h1 className="mb-2 text-2xl font-bold text-red-600">
          Payment Cancelled
        </h1>
        <p className="mb-4 text-gray-500">
          Your train ticket booking payment was cancelled.
        </p>
        <p className="mb-4 text-gray-500">
          Your booking has not been confirmed and no payment has been processed.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/booking"
            className="px-5 py-3 font-medium text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
          >
            Try Again
          </Link>
          <Link
            to="/"
            className="px-5 py-3 font-medium text-gray-800 transition duration-200 bg-gray-100 rounded hover:bg-gray-200"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cancle;
