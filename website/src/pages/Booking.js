import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import train_01 from '../assets/images/train_01.jpg';
import train_02 from '../assets/images/train_02.jpg';
import train_03 from '../assets/images/train_03.jpg';

const images = [
  train_01,
  train_02,
  train_03
];

function Booking() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState(0);


  const reset = () => { 
    setFrom('');
    setTo('');
    setDate('');
    setSeats(0);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <>
      <Navbar />
      {/* Hero */}
      <div className="relative h-screen overflow-hidden text-white bg-gradient-to-r font-body">
        <div className="absolute inset-0">
          <img 
            src={images[currentImageIndex]} 
            alt="Background Image" 
            className="object-cover object-center w-full h-full transition-opacity duration-1000" 
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-start justify-center h-1/2 p-1/4">
    <h1 className="mb-4 text-6xl font-bold leading-tight text-left">DailyRails</h1>
    <p className="mb-8 text-lg text-left text-gray-300">Online Train Seats Reservation</p>
</div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center">
        <form className="w-full max-w-lg p-5">
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3 mb-5">
              <label htmlFor="from" className="block mb-2 text-sm text-primary font-body">From</label>
              <input onChange={(e)=>setFrom(e.target.value)} type="text" id="from" className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5" placeholder="Enter departure station" required />
            </div>
            <div className="w-full px-3 mb-5">
              <label htmlFor="to" className="block mb-2 text-sm text-primary font-body">To</label>
              <input onChange={(e)=>setTo(e.target.value)} type="text" id="to" className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5" placeholder="Enter destination station" required />
            </div>
          </div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3 mb-5">
              <label htmlFor="date" className="block mb-2 text-sm text-primary font-body">Date</label>
              <input onChange={(e)=>setDate(e.target.value)} type="date" id="date" className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5" required />
            </div>
          </div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3 mb-5">
              <label htmlFor="seats" className="block mb-2 text-sm text-primary font-body">Seats</label>
              <input onChange={(e)=>setSeats(e.target.value)} type="number" id="seats" className="shadow-sm bg-gray-50 border border-secondary-1 text-tertiary text-sm rounded-sm focus:border-primary block w-full p-2.5" placeholder="Enter number of seats" required />
            </div>
          </div>
          <button type="submit" className="p-3 mr-2 text-white rounded-sm bg-primary hover:bg-secondary">Submit</button>
          <button onClick={reset} type="reset" className="p-3 text-white rounded-sm bg-primary hover:bg-secondary">Reset</button>
        </form>
      </div>
      
      <Footer />
    </>
  );
}

export default Booking;
