import { Outlet } from 'react-router-dom';
import Nav2 from './Nav2'
import {useParams} from 'react-router-dom'


const Meetinfo = () => {

    const { meetingid } = useParams()

    return (
        <div className='meeting-container'>
            <div className='nav-container'>
                <Nav2 meetingid={meetingid}/>
            </div>
            <div className='main-content'>
                <Outlet />
            </div>
        </div>
    )
}

export default Meetinfo