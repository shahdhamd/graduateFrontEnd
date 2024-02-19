import React from 'react'
import './Error.css'
function Error() {
  return (
    <div className='error'>
      <div className='image'>
        <img src='images/error.png' alt='the page you are looking for is not been found' />
      </div>

        <div class='text'>
          <h1>Oops!</h1>
          <h2>We can’t find the page you are looking for...</h2>
        </div>
        
    </div>
  )
}

export default Error