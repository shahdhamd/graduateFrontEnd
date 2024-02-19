import React from 'react'

import { IoMdSpeedometer } from "react-icons/io";
import { MdDeliveryDining } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { TbPlant } from "react-icons/tb";
import './SideBar.css'
import { FaHome } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { AiOutlinePieChart } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
function SideBar({logout,loginData}) {
  return (
    <div className='SiderBar grid'>
      <div className='logoDiv '>
        <img src='images/leafLogo.jpg'  alt="" className="Image Name" />
     
      </div>
      <div className="menuDiv">
        <h3 className="divTitle">
          Quick Menu
        </h3>
        <ul className='menuLists grid'>
        <li className="listItem">
            <Link to="/dashboard" className="menuLink flex">
              <IoMdSpeedometer className='icon' />
              <span className='smallText' >Dashboard</span>
            </Link>
          </li>

          <li className="listItem">
            <Link to="/user" className="menuLink flex">
              <CiUser className='icon' />
              <span className='smallText' >Users</span>
            </Link>
          </li>
 <li className="listItem">
         
            <Link to="/contribution" className="menuLink flex">
              <MdDeliveryDining className='icon' />
              <span className='smallText' >Contributions</span>
            </Link>
          </li>
          <li className="listItem">
         
         <Link to="/Herbs" className="menuLink flex">
           <TbPlant  className='icon' />
           <span className='smallText' >Herbs</span>
         </Link>
       </li>

        </ul>

      </div>
      <div className="settingsDiv">
        <h3 className="divTitle">
          SETTINGS
        </h3>
        <ul className='menuLists grid'>
      

          <li className="listItem">
  {loginData ? (
    <Link to="/home" className="menuLink flex">
      <FaHome className='icon' />
      <span className='smallText'>Home</span>
    </Link>
  ) : (
    <Link to="/login" onClick={logout} className="menuLink flex">
      <CiLogout className="icon" />
      <span className="smallText">Logout</span>
    </Link>
  )}
</li>

<li className="listItem">
            
            <Link to="/login" onClick={logout} className="menuLink flex">
    <CiLogout className="icon" />
    <span className="smallText">logout</span>
  </Link>
            </li>





          
        </ul>

      </div>
      <div className='siderBarCard'>
       {/* <BsQuestionCircle className='icon' />
         <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <h3>Help Center</h3>
          <p>Having trouble in Planti, please contact us from for more questions..</p>
          <button className='btn'>Go to help center</button>
        </div> */}
      </div>
    </div>
  )
}

export default SideBar; 