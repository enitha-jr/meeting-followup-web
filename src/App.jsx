import React from 'react'
import './styles/App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './header'
import Sidebar from './sidebar'


const App = () => {
    const navigate = useNavigate()
    return (
        <div className="content">
            <Sidebar />
            <Header />
            <Outlet />
        </div>
    )
}

export default App