import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar=()=> {
    const [menu, setMenu] = useState(false);
    const showMenu = () => {
        setMenu(!menu);
      };
  return (
<nav class="bg-white ">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
  </a>
  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button type="button" class="text-white bg-primary  hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-4 py-2 text-center font-body">Map</button>
      <button data-collapse-toggle="navbar-cta" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto  " >
    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4   md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 ">
      <li>
        <Link to="/" href="#" class="block py-2 px-3 md:p-0 text-primary font-body hover:text-secondary ">Home</Link>
      </li>
      <li>
      <Link to="booking" class="block py-2 px-3 md:p-0 text-primary font-body hover:text-secondary ">Booking</Link>
      </li>
      <li>
      <Link to="schedule" href="#" class="block py-2 px-3 md:p-0 text-primary font-body hover:text-secondary">Schedule</Link>
      </li>
      <li>
      <Link to="lost" class="block py-2 px-3 md:p-0 text-primary font-body hover:text-secondary">Lost and Found</Link>
      </li>
      <li>
      <Link to="contact" class="block py-2 px-3 md:p-0 text-primary font-body hover:text-secondary">Contact Us</Link>
      </li>
      

    </ul>
  </div>
  </div>
</nav>

  )
}

export default Navbar