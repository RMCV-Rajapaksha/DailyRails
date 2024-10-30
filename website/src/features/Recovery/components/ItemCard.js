import React from "react";
import { Info } from "lucide-react";

const ItemCard = ({ title, description, date }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Info className="w-6 h-6 text-tertiary" />
        </div>
        <div className="flex-1">
          <h2 className="mb-2 text-xl font-semibold text-secondary-1">
            {title}
          </h2>
          <p className="mb-4 text-secondary">{description}</p>
          <p className="text-sm text-right text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
