import React from "react";
import "./SignUpPage.css"; // Assuming you will create styles for the signup page

const SignUpPage = () => {
  return (
    <div className="signup-container">
      <img
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="Logo"
        className="logo"
      />
      <h1 className="welcome-text"> Signup to DailyRails </h1>{" "}
      <div className="input-group">
        <label htmlFor="username"> Username </label>{" "}
        <input type="text" id="username" placeholder="Enter your username" />
      </div>{" "}
      <div className="input-group">
        <label htmlFor="password"> Password </label>{" "}
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
        />
      </div>{" "}
      <div className="input-group">
        <label htmlFor="confirm-password"> Confirm Password </label>{" "}
        <input
          type="password"
          id="confirm-password"
          placeholder="Confirm your password"
        />
      </div>{" "}
      <div className="input-group">
        <label htmlFor="job-role"> Job Role </label>{" "}
        <select id="job-role">
          <option value="admin"> Admin </option>{" "}
          <option value="manager"> Manager </option>{" "}
          <option value="employee"> Employee </option>{" "}
        </select>{" "}
      </div>{" "}
      <div className="input-group">
        <label htmlFor="id"> ID </label>{" "}
        <input type="text" id="id" placeholder="Enter your ID" />
      </div>{" "}
      <button className="signup-button"> Sign Up </button>{" "}
      <div className="separator"> Or </div>{" "}
      <a href="/login" className="login-link">
        {" "}
        Already have an account ? Log in{" "}
      </a>{" "}
    </div>
  );
};

export default SignUpPage;
