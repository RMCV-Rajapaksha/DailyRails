import React from "react";

const FoundItems = ({ FoundItems }) => {
  return (
    <div className="flex w-full p-4 mt-8 space-x-4 border-2 rounded-sm border-secondary-1">
      {/* Left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src={FoundItems.imgSrc}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      {/* Right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="mb-1 text-xl font-bold md:-2 md:text-2xl text-primary">
          {FoundItems.title}
        </h1>
        <div className="flex items-center justify-between mb-2 space-x-4 text-sm font-semibold text-secondary-1 md:mb-4">
          <p>{FoundItems.reportedBy}</p>
          <div className="flex space-x-2 text-secondary-1">
            <p>{FoundItems.dateFound}</p>
            <p>{FoundItems.dateReported}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg text-secondary-1">
          {FoundItems.description}
        </p>
      </div>
    </div>
  );
};

export default FoundItems;
