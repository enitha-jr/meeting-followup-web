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
  const [meetingdetails, setMeetingdetails] = useState([]);
  // const [isCompleted, setIsCompleted] = useState(false);
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

  function EachDetail({ label, value }) {
    return (
      <div className="detail-item">
        <div>{label}</div>
        <div>{value}</div>
      </div>
    )
  }
  // console.log("Meeting Title:", meetingdetails.title);

  const handleFollowUp = () => {
    navigate('/newmeeting');
  };

  const handleComplete = () => {
    axios.put(`http://localhost:5000/meetings/${meetingid}/change-complete`)
      .then((response) => {
        console.log(response.data);
        setMeetingdetails({ ...meetingdetails, status: 'completed' });
        navigate('/meetings');
      })
      .catch((error) => {
        console.error('Error completing meeting:', error);
      });
  }
  // console.log(meetingdetails.status);

  const [showForm, setShowForm] = useState(false);
  const showPopup = () => {
    setShowForm(!showForm)
  }

  return (
    <div>
      <div className="details-content">
        <EachDetail label='Title' value={meetingdetails.title} />
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
        {meetingdetails.status !== "completed" &&
          <button className="end-meeting-btn" onClick={showPopup}>
           END THE MEETING
          </button>
        }
        <button className="follow-up-btn" onClick={handleFollowUp}>
          FOLLOW UP
        </button>
      </div>
      {showForm && (
        <div className='task-form-content'>
          <div className='overlay' onClick={showPopup}></div>
          <div className='popup-container'>
            <div className='head4'>
              <h4>Are you sure to end the meeting?</h4>
            </div>
            <div className='popup-buttons'>
              <button className='popup-close' onClick={showPopup}>close</button>
              <button className='popup-confirm' onClick={handleComplete}>Confirm</button>
            </div>
          </div> 
        </div>
      )}
    </div>
  )
}

export default Details
