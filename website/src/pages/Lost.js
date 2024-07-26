import React from 'react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LostItems from '../components/LostItems'
function Lost() {
  return (
    <>
    <Navbar/>
    <div className="px-8 md:px-[200px] min-h-[80vh] mt-20">
        <LostItems/>
        <LostItems/>
        <LostItems/>
               </div>
    <Footer/>
    </>
  )
}

export default Lost