import React from 'react';
import logo from './assets/icons/logo.png';
import { FaRegPlusSquare } from 'react-icons/fa';
import { MdOutlineGroups } from 'react-icons/md';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { FaTasks } from 'react-icons/fa';
import { IoCalendarNumberSharp } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useContext } from 'react';
import "./styles/sidebar.css";

const Sidebar = () => {
    const { userData } = useContext(UserContext);

    return (
        <div className="sidebar">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
                <h1 className="title">MEETMINUTES</h1> 
            </div>
            <div className="menu">
                <NavLink
                    to="/newmeeting"
                    className="menu-item"
                >
                    <FaRegPlusSquare className="icon" />
                    <span>New Meeting</span>
                </NavLink>
                <NavLink
                    to="/meetings"
                    className="menu-item"
                >
                    <MdOutlineGroups className="icon" />
                    <span>Meetings</span>
                </NavLink>
                <NavLink
                    to="/tasks"
                    className="menu-item"
                >
                    <FaTasks className="icon" />
                    <span>Tasks</span>
                </NavLink>
                <NavLink
                    to="/calendar"
                    className="menu-item"
                >
                    <IoCalendarNumberSharp className="icon" />
                    <span>Calendar</span>
                </NavLink>
                {userData?.role === 'superadmin' && (
                    <NavLink
                        to="/request"
                        className="menu-item"
                    >
                        <IoAlertCircleOutline className="icon" />
                        <span>Meeting Requests</span>
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
