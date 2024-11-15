import React from 'react'
import add from './assets/icons/add.svg'
import logo from './assets/icons/logo.png'
import groups from './assets/icons/groups.svg'
import task from './assets/icons/task.svg'
import calendar from './assets/icons/calendar.svg'
import './styles/sidebar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='logo-box'>
                <img src={logo} width="100px"/>
                <div>MEETMINUTES</div>
            </div>
            <div className='sidebar-item'>
                <div className="sidebar-link">
                    <NavLink to='/newmeeting' className='custom-link inner'>
                        <img src={add} />
                        <div className="sidebar-component">New Meeting</div>
                    </NavLink>
                </div>
                <div className="sidebar-link">
                    <NavLink to='/meetings' className='custom-link inner'>
                        <img src={groups} />
                        <div className="sidebar-component">Meetings</div>
                    </NavLink>
                </div>
                <div className="sidebar-link">
                    <NavLink to='/tasks' className='custom-link inner'>
                        <img src={task} />
                        <div className="sidebar-component">Tasks</div>
                    </NavLink>
                </div>
                <div className="sidebar-link">
                    <NavLink to='/calendar' className='custom-link inner'>
                        <img src={calendar} />
                        <div className="sidebar-component">Calendar</div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Sidebar