import React from 'react'
import add from './assets/add.svg'
import logo from './assets/logo.png'
import groups from './assets/groups.svg'
import task from './assets/task.svg'
import calendar from './assets/calendar.svg'
import './sidebar.css'
import { Link } from 'react-router-dom'
import NewMeeting from './pages/NewMeeting'

const Sidebar = () => {
    return (
        <div className="sidebar-color">
            <div className="sidebar">
                <div className= "app-logo">
                    <div className="logo-link">
                        <div className="logo-inner">
                            <img className="logo" src={logo} width="100px" />
                        </div>
                        <div className="logo-component">MEET MINUTES</div>
                    </div>
                </div>
                <div className="sidebar-content">
                    <div className="sidebar-link">
                        <Link to='/newmeeting' className='custom-link inner'>
                            <img src={add} />
                            <div className="sidebar-component">New Meeting</div>
                        </Link>
                    </div>
                    <div className="sidebar-link">
                        <Link to='/meetings' className='custom-link inner'>
                            <img src={groups} />
                            <div className="sidebar-component">Meetings</div>
                        </Link>
                    </div>
                    <div className="sidebar-link">
                        <Link to='/tasks' className='custom-link inner'>
                            <img src={task} />
                            <div className="sidebar-component">Tasks</div>
                        </Link>
                    </div>
                    <div className="sidebar-link">
                        <Link to='/calendar' className='custom-link inner'>
                            <img src={calendar} />
                            <div className="sidebar-component">Calendar</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar