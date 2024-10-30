import React from "react";
import ItemCard from "../components/ItemCard";

const FoundItemsPage = () => {
  const items = [
    {
      id: 1,
      title: "Lost Item: Black Laptop Bag on Ruhuna Train",
      description:
        "I lost my laptop bag today around 5 PM on the Ruhuna train. The bag is black and contains my laptop, charger, and two books. If anyone has found it or has any information about its whereabouts, please let me know. Thank you!",
      date: "Saturday, July 20, 2024",
    },
    {
      id: 2,
      title: "Lost Item: Black Laptop Bag on Ruhuna Train",
      description:
        "I lost my laptop bag today around 5 PM on the Ruhuna train. The bag is black and contains my laptop, charger, and two books. If anyone has found it or has any information about its whereabouts, please let me know. Thank you!",
      date: "Saturday, July 20, 2024",
    },
    {
      id: 3,
      title: "Lost Item: Black Laptop Bag on Ruhuna Train",
      description:
        "I lost my laptop bag today around 5 PM on the Ruhuna train. The bag is black and contains my laptop, charger, and two books. If anyone has found it or has any information about its whereabouts, please let me know. Thank you!",
      date: "Saturday, July 20, 2024",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-primary">Found Items</h1>

        <div className="space-y-4">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              title={item.title}
              description={item.description}
              date={item.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoundItemsPage;
