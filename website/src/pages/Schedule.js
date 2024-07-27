import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Schedule() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center border rounded-md shadow-lg bg-white p-4 mx-4 my-8 md:mx-auto md:max-w-4xl">
        <div className="flex flex-1 items-center border-b md:border-b-0 md:border-r px-4 py-2 md:py-0">

          <input type="text" id="name" className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5" placeholder="Start Location" required />
        </div>
        <div className="flex flex-1 items-center border-b md:border-b-0 md:border-r px-4 py-2 md:py-0">
        <input type="text" id="name" className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5" placeholder="End Location" required />
        </div>
        <div className="flex flex-1 items-center border-b md:border-b-0 md:border-r px-4 py-2 md:py-0">

        <input type="date" id="name" className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5" placeholder="End Location" required />
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-secondary mt-4 md:mt-0 md:ml-2 w-full md:w-auto">Search</button>
      </div>
      <Footer />
    </>
  );
}

export default Schedule;