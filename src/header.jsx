import React from 'react'
import bell from './assets/bell.svg'
import account from './assets/account.svg'
import './header.css'

const Header = () => {
  return (
    <div className="header">
      <div className="right-section">
        <div>
          <img src={bell} />
        </div>
        <div>DHARNESH K</div>
        <div>
          <img src={account} />
        </div>
      </div>
    </div>
  )
}

export default Header