import React from "react";

import { FoundItemsData } from "../data";
import FoundItems from "../components/FoundItems";

function Found() {
  return (
    <>
      <div className="px-8 md:px-[200px] min-h-[80vh] mt-20">
        {FoundItemsData &&
          FoundItemsData.map((item) => (
            <FoundItems key={item.id} FoundItems={item} />
          ))}
      </div>
    </>
  );
}

export default Found;
