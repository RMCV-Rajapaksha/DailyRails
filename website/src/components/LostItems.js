import React from 'react';

const LostItems = ({ p, IF }) => {
  return (
    <div className="flex w-full p-4 mt-8 space-x-4 rounded-sm border-2 border-secondary-1">
    
    
      {/* Left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
<img src="https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" className="object-cover w-full h-full"/>

</div>
   {/* Right */}
   <div className="flex flex-col w-[65%]">
    <h1 className="mb-1 text-xl font-bold md:-2 md:text-2xl text-primary">
    Lost items 
    </h1>
    <div className="flex items-center justify-between mb-2 space-x-4 text-sm font-semibold text-secondary-1 md:mb-4">
    <p>@chamara </p>
      <div className="flex space-x-2 text-secondary-1">
      <p>2001 05 18</p>
   <p>september 5</p>
      </div>
    </div>
    <p className="text-sm md:text-lg text-secondary-1">Secure your seat with ease using our streamlined ticket booking system. Whether you're on the go or planning ahead, DailyRails makes purchasing your train tickets quick and hassle-free. Enjoy a seamless experience from your mobile app or website, and never miss a train again. Book your journey today and travel with confidence!</p>
    {/* <p className="text-sm md:text-lg">{p.desc.slice(0,200)+" ...Read more"}</p> */}
</div>
    </div>
  );
};

export default LostItems;