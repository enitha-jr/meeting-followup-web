import React from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './header'
import Sidebar from './sidebar'


const App = () => {
    const navigate = useNavigate()
    return (
        <div className="content">
            <div>
                <Sidebar />
            </div>
            <div className='anti-sidebar'>
                <div className="header">
                    <Header />
                </div>
                <div className="outlet">
                    <Outlet />
                </div>
                
            </div>
        </div>
    )
}

export default App