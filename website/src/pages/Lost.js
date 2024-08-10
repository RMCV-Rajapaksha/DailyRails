import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LostItems from "../components/LostItems";
import { LostItemsData } from "../data";

function Lost() {
  return (
    <>
      <div className="px-8 md:px-[200px] min-h-[80vh] mt-20">
        {LostItemsData &&
          LostItemsData.map((item) => (
            <LostItems key={item.id} LostItems={item} />
          ))}
      </div>
    </>
  );
}

export default Lost;
