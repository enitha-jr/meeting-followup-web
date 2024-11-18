import React, { useState, useEffect } from 'react'
// import { useLocation } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/Meetings.css'
import axios from 'axios';
import './styles/Details.css';
import Nav2 from './Nav2';


const Details = () => {
    // const location = useLocation();
    // const { id } = location.state || {};
    const { meetingid } = useParams(); 
    const [meetingdetails,setMeetingdetails] =useState([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
      if (meetingid) {
          axios.get(`http://localhost:5000/meetings/${meetingid}/details`)
              .then((response) => {
                for (let item of response.data) {
                  if (item.date) {
                      item.date = String(item.date).split('T')[0];
                  }
                }
                // console.log('API Response:', response.data);
                setMeetingdetails(response.data[0]); 
              })
              .catch((error) => {
                console.error('Error fetching meeting details:', error);
              });
      }
    }, [meetingid]);

    function EachDetail({label, value}) {
      return (
        <div className="detail-item">
          <div>{label}</div>
          <div>{value}</div>
        </div>
      )
    }  
    console.log("Meeting Title:", meetingdetails.title);

    const handleEndMeeting = () => {
      setIsCompleted(true);
    };
    
    const handleFollowUp = () => {
      navigate('/newmeeting');
    };
    
    return (
      <div>
        <div className="details-content">
          <EachDetail label='Title' value={meetingdetails.title}/>
          <EachDetail label="MID" value={meetingdetails.mid} />
          <EachDetail label="Team" value={meetingdetails.dept} />
          <EachDetail label="Host" value={meetingdetails.host} />
          <EachDetail label="Date" value={meetingdetails.date} />
          <EachDetail label="Time" value={meetingdetails.time} />
          <EachDetail label="Venue" value={meetingdetails.venue} />
          <EachDetail label="Description" value={meetingdetails.description} />
          <EachDetail label="Members" value={meetingdetails.members} />
        </div>
        <div className="action-buttons">
          <button 
              className={`end-meeting-btn ${isCompleted ? 'completed' : ''}`}
              onClick={handleEndMeeting}
          >
          {isCompleted ? 'COMPLETED' : 'END THE MEETING'}
          </button>
          <button className="follow-up-btn" onClick={handleFollowUp}>
            FOLLOW UP
          </button>
        </div>
      </div>
    )
}

export default Details
