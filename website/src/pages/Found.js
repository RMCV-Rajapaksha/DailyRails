import React from "react";

import { FoundItemsData } from "../data";
import FoundItems from "../components/FoundItems";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Found() {
  return (
    <>
      <div className="px-8 md:px-[200px] min-h-[80vh] mt-20">
        {FoundItemsData &&
          FoundItemsData.map((item) => (
            <FoundItems key={item.id} FoundItems={item} />
          ))}
      </div>
      <div className="flex justify-center mt-4">
        <div className="inline-flex m-10 shadow rounded-sm-md">
          <button className="px-4 py-2 text-sm font-medium bg-white border rounded-sm border-primary text-primary rounded-sm-l-md hover:bg-secondary">
            <FaChevronLeft />
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-white text-primary">
            1
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-white border rounded-sm border-primary text-primary rounded-sm-r-md hover:bg-secondary">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default Found;
