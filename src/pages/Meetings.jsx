import React, { useState, useEffect } from 'react'
import './styles/Meetings.css'
import axios from 'axios';
import schedule from '../assets/schedule.png'
import calendar from '../assets/calendar.png'
import person from '../assets/person.png'
import apt from '../assets/apartment.png'
import meeting from '../assets/meeting.png'

const Meetings = () => {

  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/newmeetings")
      .then((response) => {
        setDetails(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [])

  return (
    <div className='meeting'>
      <nav>
        <div>Upcoming</div>
        <div>Completed</div>
        <div>My Meetings</div>
      </nav>
      <div className="meet-body">
        {details.map((detail) => (
          <div className="meet-container" key={detail.id}>
            <div className="headings">
              <p className="meeting-heading">{detail.title}</p>
              <p className="host">{detail.dept}</p>
            </div>
            <div className="meet-detail">
              <div className="persondiv">
                <div><img src={person} className="size" /></div>
                <p>{detail.host}</p>
              </div>
              <div className="calendar">
                <div><img src={calendar} className="size" /></div>
                <p>{detail.date}</p>
              </div>
              <div className="schedulediv">
                <div><img src={schedule} className="size" /></div>
                <div className="time"><p>{detail.time}</p></div>
              </div>
              <div className="apt">
                <div><img src={apt} className="size" /></div>
                <p>{detail.venue}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Meetings