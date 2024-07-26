import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroBackground from '../assets/images/HeroBackground.png';
import HeroTrain from '../assets/images/HeroTrain.png';
import { Link } from 'react-router-dom';
export const Home = () => {
  return (
    <>
    <Navbar/>
    <section class="bg-white ">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7 font-body ">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-primary font-body">Daily Rails</h1>
            <h2 class="max-w-xl mb-4 text-lg font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl text-primary font-body">Navigate your day, one train at a time</h2>
            <p class="max-w-2xl mb-6 font-light  lg:mb-8 md:text-lg lg:text-xl text:secondary-1 font-body">Welcome to DailyRails, your ultimate solution for real-time train tracking across Sri Lanka. DailyRails enhances your commute with up-to-the-minute train locations, notifications for breakdowns and cancellations, detailed schedules, and predicted arrival times. Always stay informed and plan your journeys with confidence. Features like online ticket booking make train travel more efficient and stress-free. Join us in transforming train commuting with DailyRails, making your travels smoother and more reliable nationwide.</p>
            <Link to="/map" class="fon-body inline-flex items-center justify-center px-5 py-3 mx-3 text-base font-medium text-center text-white bg-primary hover:bg-secondary rounded-sm">
                Map
            </Link> 
            <Link to="/schedule" class="font-body inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-primary bg-white border-2 border-primary rounded-sm">
           Schedule
</Link>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img className='z-10' src={HeroTrain} alt="mockup"/>
            
           
        </div>                
    </div>
</section>
<section class="bg-white ">
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 font-body">
    <div class="grid grid-cols-2 gap-4 mt-8">
            
            <img class="mt-4 w-full lg:mt-10 rounded-lg" src={HeroTrain} alt="office content 2"/>
        </div>
        <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-primary ">Your Journey, Streamlined</h2>
            <p class="mb-4 text-secondary-1">Navigate your daily commute with precision using our Live Map feature. Experience real-time train tracking like never before-watch trains move along their routes, view current locations, and stay updated on any disruptions or blockages. Our interactive map offers a clear, intuitive interface to help you plan your journey, avoid delays, and make informed decisions on the go. With DailyRails, your train travel is always on track!</p>
         
        </div>
        
    </div>
</section>
<section class="bg-white ">
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 font-body">
    <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-primary ">Your Reliable Train Timetable</h2>
            <p class="mb-4 text-secondary-1">DailyRails' Timetable feature provides detailed and up-to-date train schedules across Sri Lanka. Users can easily search routes, view departure and arrival times, and find the best connections with an intuitive interface. Continuously updated for changes, including delays and cancellations, the Timetable ensures accurate information. Whether a daily commuter or occasional traveler, DailyRails makes train travel simpler and more reliable.</p>
            
        </div>
    <div class="grid grid-cols-2 gap-4 mt-8">
            
            <img class="mt-4 w-full lg:mt-10 rounded-lg" src={HeroTrain} alt="office content 2"/>
        </div>
       
        
    </div>
</section>
<section class="bg-white ">
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 font-body">
    <div class="grid grid-cols-2 gap-4 mt-8">
            
            <img class="mt-4 w-full lg:mt-10 rounded-lg" src={HeroTrain} alt="office content 2"/>
        </div>
        <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-primary ">Seamless Ticket Booking</h2>
            <p class="mb-4 text-secondary-1">Secure your seat with ease using our streamlined ticket booking system. Whether you're on the go or planning ahead, DailyRails makes purchasing your train tickets quick and hassle-free. Enjoy a seamless experience from your mobile app or website, and never miss a train again. Book your journey today and travel with confidence!</p>
          
        </div>
        
    </div>
</section>

<section class="bg-white ">
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 font-body">
    <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-primary ">Lost & Found Hub</h2>
            <p class="mb-4 text-secondary-1">Lost something on your journey? Our Lost & Found Hub is here to help! Quickly report or search for lost items with ease. From misplaced belongings to found objects, our intuitive platform connects you with the right solutions, ensuring your lost items are reunited with you swiftly. DailyRails makes recovering your valuables straightforward and stress-free.</p>
            
        </div>
    <div class="grid grid-cols-2 gap-4 mt-8">
            
            <img class="mt-4 w-full lg:mt-10 rounded-lg" src={HeroTrain} alt="office content 2"/>
        </div>
       
        
    </div>
</section>



    <Footer/>
    </>
  )
}

export default Home