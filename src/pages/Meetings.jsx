import React, { useState, useEffect } from 'react'
import './styles/Meetings.css'
import { Outlet, useNavigate } from 'react-router-dom';
import Nav1 from './Nav1'

const Meetings = () => {

    return (
        <div className='meeting-container'>
            <div>
                <Nav1/>
            </div>
            <Outlet />
        </div>
    )
}

export default Meetings