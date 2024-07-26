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
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-primary font-body">Daily Rails</h1>
            <h2 class="max-w-xl mb-4 text-lg font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl text-primary font-body">Navigate your day, one train at a time</h2>
            <p class="max-w-2xl mb-6 font-light  lg:mb-8 md:text-lg lg:text-xl text:secondary-1 font-body">Welcome to DailyRails, your ultimate solution for real-time train tracking across Sri Lanka. DailyRails enhances your commute with up-to-the-minute train locations, notifications for breakdowns and cancellations, detailed schedules, and predicted arrival times. Always stay informed and plan your journeys with confidence. Features like online ticket booking make train travel more efficient and stress-free. Join us in transforming train commuting with DailyRails, making your travels smoother and more reliable nationwide.</p>
            <a href="#" class="fon-body inline-flex items-center justify-center px-5 py-3 mx-3 text-base font-medium text-center text-white bg-primary hover:bg-secondary rounded-sm">
                Map
            </a> 
            <a href="#" class="font-body inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-primary bg-white border-2 border-primary rounded-sm">
           Schedule
</a>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img className='z-10' src={HeroTrain} alt="mockup"/>
            <img src={HeroBackground} alt="mockup"/>
           
        </div>                
    </div>
</section>
<section class="bg-white ">
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
    <div class="grid grid-cols-2 gap-4 mt-8">
            <img class="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1"/>
            <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2"/>
        </div>
        <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">We didn't reinvent the wheel</h2>
            <p class="mb-4">We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.</p>
            <p>We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick.</p>
        </div>
        
    </div>
</section>



    <Footer/>
    </>
  )
}

export default Home