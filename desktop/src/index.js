import React from "react";
<<<<<<< Updated upstream
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
    <React.StrictMode>
      <App />
    </React.StrictMode>

);
=======
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // Add this
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Move BrowserRouter here */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
>>>>>>> Stashed changes
