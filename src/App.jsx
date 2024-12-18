import React from 'react'
import './styles/App.css'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Sidebar from './sidebar'
import { UserContext } from './UserContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom';


const App = () => {
    const { userData } = useContext(UserContext);
    // console.log(userData);

    return (
        <div className="content">
            <Sidebar />
            <div className="anti-sidebar">
                <Header user={userData?.username || "Guest"}/>
                <div className="outlet-container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default App;