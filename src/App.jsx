import React from 'react'
import './styles/App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './header'
import Sidebar from './sidebar'


const App = () => {
    return (
        <div className="content">
            <Sidebar/>
            <div className="anti-sidebar">
                <Header/>
                <div className="outlet-container">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default App