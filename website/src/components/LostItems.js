import React from 'react';

const LostItems = ({ p, IF }) => {
  return (
    <div className="flex w-full p-4 mt-8 space-x-4 rounded-sm border-2 border-secondary-1 font-body">
      {/* Left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src="https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className="object-cover w-full h-full" />
      </div>
      {/* Right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="mb-1 text-xl font-bold md:mb-2 md:text-2xl text-primary">
          "Lost & Found Hub" - DailyRails"
        </h1>
        <div className="flex items-center justify-between mb-2 space-x-4  font-semibold text-secondary-1 md:mb-4">
          <p>@Chamra Vishwajith</p>
          <div className="flex space-x-2 text-secondary-1">
            <p>
              Lost something on your journey? Our Lost & Found Hub is here to
              help! Quickly report or search for lost items with ease. From
              misplaced belongings to found objects, our intuitive platform
              connects you with the right solutions, ensuring your lost items
              are reunited with you swiftly. DailyRails makes recovering your
              valuables straightforward and stress-free.Lost something on your journey? Our Lost & Found Hub is here to
              help! Quickly report or search for lost items with ease. From
              misplaced belongings to found objects, our intuitive platform
              connects you with the right solutions, ensuring your lost items
              are reunited with you swiftly. DailyRails makes recovering your
              valuables straightforward and stress-free.
            </p>
            <p>2001.5.18</p>
          </div>
        </div>
        {/* <p className="text-sm md:text-lg">
          {p.desc.slice(0, 200) + ' ...Read more'}
        </p> */}
      </div>
    </div>
  );
};

export default LostItems;