import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // This is the only Router
import App from "./App"; // Main app component
import './index.css';  // Ensure this points to your global CSS file if you are using custom styles


ReactDOM.render(
  <BrowserRouter>  {/* Wrap your entire app in a single Router */}
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
