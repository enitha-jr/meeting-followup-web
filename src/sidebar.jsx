import React from 'react'
import add from './assets/icons/add.svg'
import logo from './assets/icons/logo.png'
import groups from './assets/icons/groups.svg'
import task from './assets/icons/task.svg'
import calendar from './assets/icons/calendar.svg'
import './styles/sidebar.css'
import { NavLink } from 'react-router-dom'
import { UserContext } from './UserContext'
import { useContext } from 'react'

const Sidebar = () => {
    const { userData } = useContext(UserContext);
    console.log(userData?.role);

    return (
        <div className='sidebar'>
            <div className='logo-box'>
                <img src={logo} width="100px"/>
                <div>MEETMINUTES</div>
            </div>
            <div>
            </div>
                <NavLink to='/newmeeting' className='custom-link inner'>
                    <img src={add} />
                    <div className="sidebar-title">New Meeting</div>
                </NavLink>
                <NavLink to='/meetings' className='custom-link inner'>
                    <img src={groups} />
                    <div className="sidebar-title">Meetings</div>
                </NavLink>
                <NavLink to='/tasks' className='custom-link inner'>
                    <img src={task} />
                    <div className="sidebar-title">Tasks</div>
                </NavLink>
                <NavLink to='/calendar' className='custom-link inner'>
                    <img src={calendar} />
                    <div className="sidebar-title">Calendar</div>
                </NavLink>
                {
                    userData.role === 'superadmin' ? (
                        <NavLink to='/request' className='custom-link inner'>
                            <img src={groups} />
                            <div className="sidebar-title">Meeting Requests</div>
                        </NavLink>
                    ): null
                }
            </div>
    )
}

export default Sidebar