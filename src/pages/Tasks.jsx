import React, { useState, useEffect } from 'react'
import './styles/Meetings.css'
import { Outlet } from 'react-router-dom';
import Nav3 from './Nav3'

const Tasks = () => {

    return (
        <div className='meeting-container'>
            <div className='nav-container'>
                <Nav3/>
            </div>
            <div className='main-content'>
                <Outlet />
            </div>
        </div>
    )
}

export default Tasks