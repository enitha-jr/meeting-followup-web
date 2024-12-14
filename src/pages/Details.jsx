import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles/Meetings.css';
import './styles/Details.css';
import axios from 'axios';
import { FiTrash2 } from 'react-icons/fi';
import {FiEdit} from 'react-icons/fi';


const Details = () => {

  const { meetingid } = useParams();
  const [meetingdetails, setMeetingdetails] = useState({});
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (meetingid) {
      axios.get(`http://localhost:5000/meetings/${meetingid}/details`)
        .then((response) => {
          const details = response.data[0];
          if (details.date) {
            details.date = details.date.split('T')[0];
          }
          setMeetingdetails(details);
        })
        .catch((error) => {
          console.error('Error fetching meeting details:', error);
        });
    }
  }, [meetingid]);

  // console.log("Meeting Title:", meetingdetails.title);

  const handleFollowUp = () => {
    navigate('/newmeeting');
  };

  const handleComplete = () => {
    axios.put(`http://localhost:5000/meetings/${meetingid}/change-complete`)
      .then(() => {
        setMeetingdetails((prev) => ({ ...prev, status: 'completed' }));
        navigate('/meetings');
      })
      .catch((error) => {
        console.error('Error completing meeting:', error);
      });
  };

  const togglePopup = () => setShowForm(!showForm);

  return (
    <div className="details-content">
      <div className='details-handlers'>
            <NavLink to="/updatemeetingdetails/:meetingid" >
              <button>Edit <FiEdit/></button>
            </NavLink>
      </div>
      <div className="details-card">
        <div className="detail-item">
          <div className="detail-item-left">
            <div><span>Title : </span> {meetingdetails.title || 'N/A'}</div>
            <div><span>Mid :</span> {meetingdetails.mid || 'N/A'}</div>
            <div><span>Dept :</span> {meetingdetails.dept || 'N/A'}</div>
            <div><span>Host :</span> {meetingdetails.host || 'N/A'}</div>
            <div><span>Date :</span> {meetingdetails.date || 'N/A'}</div>
            <div><span>Time :</span> {meetingdetails.time || 'N/A'}</div>
          </div>
          <div className="detail-item-right">
            <div><span>Venue :</span> {meetingdetails.venue || 'N/A'}</div>
            <div>
              <span>Description :</span>
              <div className="scroll-description">
                {meetingdetails.description || 'No Description'}
              </div>
            </div>
            <div>
              <span>Members :</span>
              <div className="scroll-members">
                {Array.isArray(meetingdetails.members) ? (
                  meetingdetails.members.map((member, index) => (
                    <div key={index}>{member}</div>
                  ))
                ) : (
                  <div>No Members</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="action-buttons">
        {meetingdetails.status !== 'completed' && (
          <button className="end-meeting-btn" onClick={togglePopup}>
            END THE MEETING
          </button>
        )}
        <button className="follow-up-btn" onClick={handleFollowUp}>
          FOLLOW UP
        </button>
      </div>
      {showForm && (
        <div className="task-form-content">
          <div className="overlay" onClick={togglePopup}></div>
          <div className="popup-container">
            <div className="head4">
              <h4>Are you sure you want to end the meeting?</h4>
            </div>
            <div className="popup-buttons">
              <button className="popup-close" onClick={togglePopup}>
                Close
              </button>
              <button className="popup-confirm" onClick={handleComplete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
