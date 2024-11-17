import { Outlet } from 'react-router-dom';
import Nav2 from './Nav2'

const Meetinfo = () => {

    return (
        <div className='meeting-container'>
            <div className='nav-container'>
                <Nav2/>
            </div>
            <div className='main-content'>
                <Outlet />
            </div>
        </div>
    )
}

export default Meetinfo