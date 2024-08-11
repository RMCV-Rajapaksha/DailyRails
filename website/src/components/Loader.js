// src/components/Loader.js
import React from "react";
import loaderGif from "../assets/gif/train-loader.gif"; // Adjust the path as needed

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <img src={loaderGif} alt="Loading..." className="w-28 h-28" />
    </div>
  );
};

export default Loader;
