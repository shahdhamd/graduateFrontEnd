import React from 'react'
import './Body.css'

import Top from './Top/Top';
import Listing from './Listing/Listing'

function Body() {
  return (
    <div className='mainContent'>

      <Top/>
      <div className='boottom '>
        <Listing/>
      </div>
      
    </div>
    
  )
}

export default Body