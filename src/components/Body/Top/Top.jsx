import React from 'react'

import { BiSearchAlt } from "react-icons/bi";
import {BsQuestionCircle} from 'react-icons/bs'
import './Top.css'
import { useNavigate } from 'react-router-dom';
function Top() {
  const navigate = useNavigate();

  const goToProfile=()=>{
    navigate('/profile')
  }
  return (
    <div className='top'>
      <div className="Topheader flex">
        <div className="title">
          <h2>Welcome </h2>
          <p>Hello , Welcome back!</p>
        </div>
        {/* <div className="searchBar flex">
          <input type='text' placeholder='Search Dashboard' />
          <BiSearchAlt className='icon' />
        </div> */}
        <div className="adminDiv flex">
        <div className="adminImage" onClick={goToProfile}>
            <img src='images/leafLogo.jpg' alt="" className="admin Image" />
          </div>
      
          
        </div>
      </div>
      <div className="cardd flex">
        <div className="rightCard flex">
          <h1>
          View and analyze images of medicinal herbs</h1>
    <p>Adopt the pace of nature</p>
          <div className="buttons">
    <button className='btn' style={{color:"white"}}>Explore More</button>
    <button className='btn transparent'>best information</button>
</div>

          <div className="videoDiv">
            <video src='images/herrb.mp4' autoPlay loop muted></video>
          </div>
        </div>
        <div className="leftCard flex">
          <div className="main flex">
            <div className="textDiv">
              <h1>My Stat</h1>
              <div className='flex'>
                <div className="flex">
                <span>
                  Today <br/> <small>4 herps</small>
                </span>
              </div>

              <div className="flex">
                <span>
                  This Month <br/> <small>100  herps</small>
                </span>
              </div>
              </div>
              
            
            </div>
            <div className="imgDiv">
              <img src='images/treee.png' alt="" className="Image Name" />
            </div>

            <div className='siderBarCard'>
<BsQuestionCircle className='icon'/>
{/* <div className="cardContent">
  <div className="circle1"></div>
  <div className="circle2"></div>
  <h3>Help Center</h3>
  <p>Having trouble in Planti, please contact us from for more questions..</p>
<button className='btn'>Go to help center</button>
</div> */}
</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Top