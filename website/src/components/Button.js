// src/components/Button.js
import React from "react";

const Button = ({ type = "button", onClick, children, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-3 text-white rounded-sm bg-primary hover:bg-secondary ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
