import React, { useState, useEffect } from 'react'
// import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './styles/Meetings.css'
import axios from 'axios';
import './styles/Details.css';
import Nav2 from './Nav2';

const Details = () => {
    // const location = useLocation();
    // const { id } = location.state || {};
    const { id } = useParams(); 
    const [meetingdetails,setMeetingdetails] =useState([]);


    useEffect(() => {
      if (id) {
          axios.get(`http://localhost:5000/newmeetings/${id}`)
              .then((response) => {
                // console.log('API Response:', response.data);
                setMeetingdetails(response.data[0]); 
              })
              .catch((error) => {
                console.error('Error fetching meeting details:', error);
              });
      }
    }, [id]);

    function EachDetail({label, value}) {
      return (
        <div className="detail-item">
          <div>{label}</div>
          <div>{value}</div>
        </div>
      )
    }  
    // console.log("Meeting Title:", meetingdetails.title);
    
    return (
      <div>
        <div>
          <Nav2/>
        </div>
        <div className="meet-content">
          <EachDetail label='Title' value={meetingdetails.title}/>
          <EachDetail label="Meeting ID" value={meetingdetails.meetid} />
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


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './styles/Details.css';

// const Details = () => {
//   const [isCompleted, setIsCompleted] = useState(false);
//   const navigate = useNavigate();

//   const meetingData = {
//     title: "Project Review",
//     meetingId: "87654",
//     team: "IT dept",
//     facilitator: "Mr.asdf",
//     date: "21-10-2024",
//     time: "11:00 am",
//     venue: "Seminar Hall",
//     members: [
//       "enitha.it23@bitsaty",
//       "enitha.it23@bitsaty",
//       "enitha.it23@bitsaty"
//     ]
//   };

//   const handleEndMeeting = () => {
//     setIsCompleted(true);
//   };

//   const handleFollowUp = () => {
//     navigate('/newmeeting');
//   };

//   return (
//     <div className="meeting-details-container">
    
//       <div className="meeting-info">
//         <div className="info-header">
//           <h2>Meeting Details</h2>
//           <button className="edit-btn">EDIT</button>
//         </div>

//         <div className="details-grid">
//           <div className="detail-item">
//             <label>Meeting Title</label>
//             <span>{meetingData.title}</span>
//           </div>
//           <div className="detail-item">
//             <label>Meeting ID</label>
//             <span>{meetingData.meetingId}</span>
//           </div>
//           <div className="detail-item">
//             <label>Team</label>
//             <span>{meetingData.team}</span>
//           </div>
//           <div className="detail-item">
//             <label>Facilitator</label>
//             <span>{meetingData.facilitator}</span>
//           </div>
//           <div className="detail-item">
//             <label>Date</label>
//             <span>{meetingData.date}</span>
//           </div>
//           <div className="detail-item">
//             <label>Time</label>
//             <span>{meetingData.time}</span>
//           </div>
//           <div className="detail-item">
//             <label>Venue</label>
//             <span>{meetingData.venue}</span>
//           </div>
//           <div className="detail-item">
//             <label>Members</label>
//             <div className="members-list">
//               {meetingData.members.map((member, index) => (
//                 <div key={index} className="member-tag">
//                   {member}
//                   <span className="remove-member">×</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="action-buttons">
//           <button 
//             className={`end-meeting-btn ${isCompleted ? 'completed' : ''}`}
//             onClick={handleEndMeeting}
//           >
//             {isCompleted ? 'COMPLETED' : 'END THE MEETING'}
//           </button>
//           <button className="follow-up-btn" onClick={handleFollowUp}>
//             FOLLOW UP
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Details;