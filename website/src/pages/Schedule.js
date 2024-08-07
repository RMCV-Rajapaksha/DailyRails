import React from "react";

function Schedule() {
  return (
    <>
      <div className="flex flex-col items-center p-4 mx-4 my-8 md:flex-row md:mx-auto md:max-w-4xl">
        <div className="flex items-center flex-1 px-4 py-2 md:py-0">
          <input
            type="text"
            id="start-location"
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5"
            placeholder="Start Location"
            required
          />
        </div>
        <div className="flex items-center flex-1 px-4 py-2 border-b md:border-b-0 md:border-r md:py-0">
          <input
            type="text"
            id="end-location"
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5"
            placeholder="End Location"
            required
          />
        </div>
        <div className="flex items-center flex-1 px-4 py-2 border-b md:border-b-0 md:border-r md:py-0">
          <input
            type="date"
            id="date"
            className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5"
            required
          />
        </div>
        <button className="w-full px-4 py-2 mt-4 text-white rounded-sm bg-primary hover:bg-secondary md:mt-0 md:ml-2 md:w-auto">
          Search
        </button>
      </div>

      <div className="relative w-3/4 mx-auto overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white rtl:text-right dark:text-white dark:bg-gray-800">
            Train Schedule
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Browse the train schedules to find the best options for your
              journey.
            </p>
          </caption>
          <thead className="text-xs uppercase text-primary bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Train Name
              </th>
              <th scope="col" className="px-6 py-3">
                Departs
              </th>
              <th scope="col" className="px-6 py-3">
                Arrives
              </th>
              <th scope="col" className="px-6 py-3">
                Stations
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b ">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">
                Express Train
              </th>
              <td className="px-6 py-4">10:00 AM</td>
              <td className="px-6 py-4">2:00 PM</td>
              <td className="px-6 py-4">Station A, Station B</td>
            </tr>
            <tr className="bg-white border-b ">
              <th scope="row" className="px-6 py-4 font-medium text-primary ">
                Local Train
              </th>
              <td className="px-6 py-4">11:00 AM</td>
              <td className="px-6 py-4">3:00 PM</td>
              <td className="px-6 py-4">Station C, Station D</td>
            </tr>
            <tr className="bg-white ">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                Night Train
              </th>
              <td className="px-6 py-4">8:00 PM</td>
              <td className="px-6 py-4">6:00 AM</td>
              <td className="px-6 py-4">Station E, Station F</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Schedule;
