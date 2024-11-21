import React from 'react'
import bell from './assets/icons/bell.svg'
import account from './assets/icons/account.svg'
import './styles/header.css'

const Header = () => {
  return (
    <div className="header">
        <div className="left-section">
            
        </div>
        <div className="middle-section">
            
        </div>
        <div className="right-section">
            <div className="bell-icon-container">
                <img className="bell-icon" src={bell}/>
            </div>
            <div className="name-container">
                <div className="name">DHARNESH K</div>
            </div>
            <img className="current-user-picture" src={account}/>
        </div>
    </div>
  )
}

export default Header