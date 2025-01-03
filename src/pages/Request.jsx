import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'


const Request = () => {

  const [showpopup, setShowpopup] = useState(false);
  // const [selectedTask, setSelectedTask] = useState(null);

  // const showTaskform = (task) => {
  //   setSelectedTask(task);
  //   setShowpopup(!showpopup)
  // }

  const [meetingdetails, setMeetingdetails] = useState([]);
  useEffect(() => {
    try {
      axios.get(`http://localhost:5000/meetings/request`)
        .then((response) => {
          setMeetingdetails(response.data);
          console.log(response.data);
        })
    }catch (error){
      console.error('Error fetching meeting details:', error);
    };
}, []);

return (
  <div className='report-content'>
    <div className="report-container">
      {meetingdetails.length > 0 ? (
        <table className='report-table'>
          <tbody>
            {meetingdetails.map((item, index) => (
              <tr className={`report-table-row ${item.status}`} key={index}>
                <td>{item.title}</td>
                <td><button className={`report-status-btn`}>ACCEPT</button></td>
                <td><button className={`report-status-btn`}>REJECT</button></td>
              </tr>
            ))}
          </tbody>
        </table>) : (
        <div>
          <h3>No Request</h3>
        </div>
      )
      }
    </div>
    {/* {showTaskform && selectedTask && (
        <div className='task-content'>
          <div className='overlay' onClick={() => showTaskform(false)}></div>
          <div className="details-card">
            <div className="detail-item">
              <div className="detail-item-left">
                <div><span>Title : </span> {meetingdetails.title || 'N/A'}</div>
                <div><span>Mid :</span> {meetingdetails.mid || 'N/A'}</div>
                <div><span>Dept :</span> {meetingdetails.dept || 'N/A'}</div>
                <div><span>Host :</span> {meetingdetails.host || 'N/A'}</div>
                <div><span>Date :</span> {meetingdetails.date || 'N/A'}</div>
                <div><span>Time :</span> {meetingdetails.time || 'N/A'}</div>
                <div><span>Minute Taker :</span> {meetingdetails.minutetaker || 'N/A'}</div>
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
        </div>

      )} */}
  </div>
)
}

export default Request