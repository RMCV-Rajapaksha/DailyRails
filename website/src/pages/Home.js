import React from 'react'


import HeroTrain from '../assets/images/HeroTrain.png';
import GPS from '../assets/images/GPS.png';
import Schedule from '../assets/images/Schedule.png';
import Booking from '../assets/images/Booking.png';

import LostAndFound from '../assets/images/LostAndFound.png';

import { Link } from 'react-router-dom';
export const Home = () => {
  return (
    <>
  
    <section className="bg-white">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7 font-body">
        <h1 className="max-w-2xl mb-4 text-6xl font-extrabold leading-none tracking-tight md:text-7xl xl:text-7xl text-primary font-body">Daily Rails</h1>
            <h2 className="max-w-xl mb-4 text-lg font-extrabold leading-none tracking-tight md:text-3xl xl:text-4xl text-primary font-body">Navigate your day, one train at a time</h2>
            <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-secondary-1 font-body">Welcome to DailyRails, your ultimate solution for real-time train tracking across Sri Lanka. DailyRails enhances your commute with up-to-the-minute train locations, notifications for breakdowns and cancellations, detailed schedules, and predicted arrival times. Always stay informed and plan your journeys with confidence. Features like online ticket booking make train travel more efficient and stress-free. Join us in transforming train commuting with DailyRails, making your travels smoother and more reliable nationwide.</p>
            <Link to="/map" className="inline-flex items-center justify-center px-5 py-3 mx-3 text-base font-medium text-center text-white rounded-sm font-body bg-primary hover:bg-secondary">
                Map
            </Link> 
            <Link to="/schedule" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center bg-white border-2 rounded-sm font-body text-primary border-primary">
                Schedule
            </Link>
        </div>
        <div className=" lg:mt-0 lg:col-span-5 lg:flex">
       
    <img className="z-10 w-1/2 h-1/2 lg:w-3/4 lg:h-3/4" src={HeroTrain} alt="mockup"/>

</div>             
    </div>
</section>


<section className="bg-white">
  <div className="items-center max-w-screen-xl gap-16 px-4 py-8 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 font-body">
    <div className="order-2 hidden grid-cols-1 gap-4 mt-8 lg:order-1 md:grid">
      <img className="w-full mt-4 rounded-lg lg:mt-10 " src={GPS} alt="office content 2" />
    </div>
    
    <div className="order-1 font-light text-gray-500 lg:order-2 sm:text-lg dark:text-gray-400">
      <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-primary">Your Journey, Streamlined</h2>
      <p className="mb-4 text-secondary-1">Navigate your daily commute with precision using our Live Map feature. Experience real-time train tracking like never before-watch trains move along their routes, view current locations, and stay updated on any disruptions or blockages. Our interactive map offers a clear, intuitive interface to help you plan your journey, avoid delays, and make informed decisions on the go. With DailyRails, your train travel is always on track!</p>
    </div>
    <div className="order-1 order-2 grid-cols-1 gap-4 mt-8 md:grid lg:hidden">
      <img className="w-full mt-4 rounded-lg lg:mt-10" src={GPS} alt="office content 2" />
    </div>
  </div>
</section>


<section class="bg-white ">
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 font-body">
    <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-primary ">Your Reliable Train Timetable</h2>
            <p class="mb-4 text-secondary-1">DailyRails' Timetable feature provides detailed and up-to-date train schedules across Sri Lanka. Users can easily search routes, view departure and arrival times, and find the best connections with an intuitive interface. Continuously updated for changes, including delays and cancellations, the Timetable ensures accurate information. Whether a daily commuter or occasional traveler, DailyRails makes train travel simpler and more reliable.</p>
            
        </div>
    <div class="grid grid-cols-1 gap-4 mt-8">
            
            <img class="mt-4 w-full lg:mt-10 rounded-lg" src={Schedule} alt="office content 2"/>
        </div>
       
        
    </div>
</section>

<section className="bg-white">
  <div className="items-center max-w-screen-xl gap-16 px-4 py-8 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 font-body">
    <div className="order-2 hidden grid-cols-1 gap-4 mt-8 lg:order-1 md:grid">
      <img className="w-full mt-4 rounded-lg lg:mt-10" src={Booking} alt="office content 2" />
    </div>
    
    <div className="order-1 font-light text-gray-500 lg:order-2 sm:text-lg dark:text-gray-400">
      <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-primary">Seamless Ticket Booking</h2>
      <p className="mb-4 text-secondary-1">Secure your seat with ease using our streamlined ticket booking system. Whether you're on the go or planning ahead, DailyRails makes purchasing your train tickets quick and hassle-free. Enjoy a seamless experience from your mobile app or website, and never miss a train again. Book your journey today and travel with confidence!</p>
    </div>
    <div className="order-1 order-2 grid-cols-1 gap-4 mt-8 md:grid lg:hidden">
      <img className="w-full mt-4 rounded-lg lg:mt-10" src={Booking} alt="office content 2" />
    </div>
  </div>
</section>

<section class="bg-white ">
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 font-body">
    <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-primary ">Lost & Found Hub</h2>
            <p class="mb-4 text-secondary-1">Lost something on your journey? Our Lost & Found Hub is here to help! Quickly report or search for lost items with ease. From misplaced belongings to found objects, our intuitive platform connects you with the right solutions, ensuring your lost items are reunited with you swiftly. DailyRails makes recovering your valuables straightforward and stress-free.</p>
            
        </div>
    <div class="grid grid-cols-1 gap-4 mt-8">
            
            <img class="mt-4 w-full lg:mt-10 rounded-lg" src={LostAndFound} alt="office content 2"/>
        </div>
       
        
    </div>
</section>



 
    </>
  )
}

export default Home