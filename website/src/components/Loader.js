import React from "react";
import Lottie from "react-lottie";
import loaderAnimation from "../assets/gif/loader.json"; // Adjust the path as needed

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default Loader;
