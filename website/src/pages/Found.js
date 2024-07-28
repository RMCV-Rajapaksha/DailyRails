import React from 'react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FoundItems from '../components/FoundItems'

function Found() {
  return (
    <>
    <Navbar/>
    <div className="px-8 md:px-[200px] min-h-[80vh] mt-20">
        <FoundItems/>
        <FoundItems/>
        <FoundItems/>
               </div>
    <Footer/>
    </>
  )
}

export default Found