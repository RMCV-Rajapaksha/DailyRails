import React from "react";
import LostItems from "../components/LostItems";
import { LostItemsData } from "../data";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function News() {
  return (
    <>
      <div className="px-8 md:px-[200px] min-h-[80vh] mt-20">
        {LostItemsData &&
          LostItemsData.map((item) => (
            <LostItems key={item.id} LostItems={item} />
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

export default News;
