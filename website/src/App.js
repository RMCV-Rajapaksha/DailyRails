import React from 'react';

import {Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Found from './pages/Found';
import Lost from './pages/Lost';
import Schedule from './pages/Schedule';
import Contact from './pages/Contact';

function App() {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/found" element={<Found />} />
        <Route path="/lost" element={<Lost />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

  );
}

export default App;


