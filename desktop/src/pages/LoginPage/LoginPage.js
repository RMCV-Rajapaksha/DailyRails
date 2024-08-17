import React from "react";
import "./LoginPage.css"; // Assuming you have styles

const LoginPage = () => {
  return (
    <div className="login-container">
      <img
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="Logo"
        className="logo"
      />
      <h1 className="welcome-text"> Welcome to DailyRails </h1>{" "}
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
      <a href="/forgot-password" className="forgot-password">
        {" "}
        Forgot password ?{" "}
      </a>{" "}
      <button className="login-button"> Login </button>{" "}
      <div className="separator"> Or </div>{" "}
      <button
        className="signup-button"
        onClick={() => (window.location.href = "/signup")}
      >
        {" "}
        Sign Up{" "}
      </button>{" "}
    </div>
  );
};

export default LoginPage;
