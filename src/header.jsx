import React, { useState } from 'react'
import './styles/header.css'
import { FaRegCircleUser } from "react-icons/fa6";
import { UserContext } from './UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({user}) => {
  const navigate = useNavigate()
  const { setUserData } = useContext(UserContext);
  const [showDropdown,setshowDropdown] = useState(false);

  const handleLogout = () => {
    setUserData(null);
    navigate('/login')
};
  const handleDropdown = () =>{
    setshowDropdown(!showDropdown);
  }
  return (
    <div className="header">
        <div className="head-container">
            <div className="name-container">
                <div className="name">HELLO, {user}</div>
            </div>
            <div className="dropdown-container">
              <FaRegCircleUser className="user-icon"size={25} onClick={handleDropdown}/>
              {showDropdown && 
                <div className="dropdown-menu">
                  <ul>
                      <li>Profile</li>
                      <li>Settings</li>
                      <li onClick={handleLogout} >Logout</li>
                  </ul>
                </div>
              }
            </div>
        </div>
    </div>
  )
}

export default Header