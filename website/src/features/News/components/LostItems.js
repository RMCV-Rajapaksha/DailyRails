import React from "react";

const LostItems = ({ LostItems }) => {
  return (
    <div className="flex w-full p-4 mt-8 space-x-4 border-2 rounded-sm border-secondary-1">
      {/* Left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src={LostItems.imgSrc}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      {/* Right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="mb-1 text-xl font-bold md:-2 md:text-2xl text-primary">
          {LostItems.title}
        </h1>
        <div className="flex items-center justify-between mb-2 space-x-4 text-sm font-semibold text-secondary-1 md:mb-4">
          <p>{LostItems.reportedBy}</p>
          <div className="flex space-x-2 text-secondary-1">
            <p>{LostItems.dateFound}</p>
            <p>{LostItems.dateReported}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg text-secondary-1">
          {LostItems.description}
        </p>
      </div>
    </div>
  );
};

export default LostItems;
