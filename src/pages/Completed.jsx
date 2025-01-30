import React, { useState, useEffect } from 'react'
// import './styles/Meetings.css'
import axios from 'axios';
import schedule from '../assets/icons/schedule.png'
import { IoCalendarNumberSharp } from 'react-icons/io5';
import person from '../assets/icons/person.png'
import venue from '../assets/icons/apartment.png'
import meeting from '../assets/icons/meeting1.png'
import meeting2 from '../assets/icons/meeting2.png'
import { TbSquareRoundedLetterF } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'
import { useContext } from 'react'

function Completed() {
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);
    if (!userData) {
        navigate('/login');
    }
    const [details, setDetails] = useState([]);
    useEffect(() => {
        axios.post("http://localhost:5000/meetings/completed", { username: userData?.username })
            .then((response) => {
                for (let item of response.data) {
                    if (item.date) {
                        item.date = String(item.date).split('T')[0];
                    }
                }
                setDetails(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }, [])
    const handleDetail = (meetingid) => {
        navigate(`/meetings/${meetingid}`);
    }
    return (
        <div className="meet-body">
            {details.map((detail) => (
                <div className='meet-overview' key={detail.meetingid} onClick={() => handleDetail(detail.meetingid)}>
                    <div className="followup-badge">
                        {detail.followup === "yes" && (
                            <TbSquareRoundedLetterF size="28" />
                        )}
                    </div>
                    <div className='meet-image'>
                        {userData.username === detail.host ?
                            (<img src={meeting} width="140" height="100" />) :
                            (<img src={meeting2} width="140" height="100" />)
                        }
                    </div>
                    <div className='meet-head'>
                        <div className='meet-title'>
                            {detail.title}
                        </div>
                        <div className='meet-by'>by {detail.dept}</div>
                    </div>
                    <div className='meet-details'>
                        <div className='meet-details-container'>
                            <img src={person} width={22} />
                            <div>{detail.host}</div>
                        </div>
                        <div className='meet-details-container'>
                            <IoCalendarNumberSharp size={22} />
                            <div>{detail.date}</div>
                        </div>
                        <div className='meet-details-container'>
                            <img src={venue} width={22} />
                            <div>{detail.venue}</div>
                        </div>
                        <div className='meet-details-container'>
                            <img src={schedule} width={22} />
                            <div>{detail.time}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Completed