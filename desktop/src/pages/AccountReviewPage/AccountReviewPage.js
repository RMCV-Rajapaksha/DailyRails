import React from "react";
import { useNavigate } from "react-router-dom"; // Update to useNavigate
import "./AccountReviewPage.css";

const AccountReviewPage = () => {
  const navigate = useNavigate(); // Update to useNavigate

  const handleBackToLogin = () => {
    navigate("/login"); // Use navigate instead of history.push
  };

  return (
    <div className="account-review-container">
      <h1 className="review-text">
        {" "}
        Admin will review and enable your account{" "}
      </h1>{" "}
      <button className="back-button" onClick={handleBackToLogin}>
        Back to Login{" "}
      </button>{" "}
    </div>
  );
};

export default AccountReviewPage;
