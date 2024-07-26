import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroBackground from '../assets/images/HeroBackground.png';
import HeroTrain from '../assets/images/HeroTrain.png';
export const Home = () => {
  return (
    <>
    <Navbar/>
    <section class="bg-white ">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7 font-body ">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-primary">Daily Rails</h1>
            <h2 class="max-w-2xl mb-4 text-xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-primary">Navigate your day, one train at a time</h2>
            <p class="max-w-2xl mb-6 font-light  lg:mb-8 md:text-lg lg:text-xl text:secondary-1">Welcome to DailyRails, your ultimate solution for real-time train tracking across Sri Lanka. DailyRails enhances your commute with up-to-the-minute train locations, notifications for breakdowns and cancellations, detailed schedules, and predicted arrival times. Always stay informed and plan your journeys with confidence. Features like online ticket booking make train travel more efficient and stress-free. Join us in transforming train commuting with DailyRails, making your travels smoother and more reliable nationwide.</p>
            <a href="#" class="inline-flex items-center justify-center px-5 py-3 mx-3 text-base font-medium text-center text-white bg-primary hover:bg-secondary rounded-sm">
                Map
            </a> 
            <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-primary bg-white border-2 border-primary rounded-sm">
    Speak to Sales
</a>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img className='z-10' src={HeroTrain} alt="mockup"/>
            <img src={HeroBackground} alt="mockup"/>
           
        </div>                
    </div>
</section>
    <Footer/>
    </>
  )
}

export default Home