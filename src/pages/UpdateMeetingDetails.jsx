import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/NewMeeting.css';
import './styles/UpdateMeetingDetails.css';
import axios from 'axios';

function UpdateMeetingDetails() {

  const {meetingid} = useParams()

  const [followup, setFollowup] = useState('');
  const [title, setTitle] = useState('');
  const [mid, setMid] = useState('');
  const [dept, setDept] = useState('');
  const [host, setHost] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [desc, setDesc] = useState('');
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);

  const navigate = useNavigate()

  const handleAddMember = (e) => {
    if (e.key === 'Enter' && name.trim()!==''){
      e.preventDefault();
      setMembers([...members, name]);
      setName('');
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/meetings/${meetingid}/details`)
      .then((response) => {
        const details = response.data[0];
        if (details.date) {
          details.date = details.date.split('T')[0];
        }
        setFollowup(details.followup);
        setTitle(details.title);
        setMid(details.mid);
        setDept(details.dept);
        setHost(details.host);
        setDate(details.date);
        setTime(details.time);
        setVenue(details.venue);
        setDesc(details.desc);
        setMembers(details.members);
      })
      .catch((error) => {
        console.error('Error fetching meeting details:', error);
      });
  }, [meetingid])

  const handleSubmit = (e) => {
    e.preventDefault()
    const values = {followup, title, mid, dept, host, date, time, venue, desc, members}
    axios.put('http://localhost:5000/meetings/updatemeetingdetails/'+meetingid, values)
    .then(res => {
      console.log(res)
      navigate(-1)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className='newmeeting-container'>
        <div className="head3">
          <h3>UPDATE-MEETING</h3>
        </div>
        <form className="newmeeting-form" onSubmit={handleSubmit}>
          <div className="details">
            <div className="left">
              <div>
                <label htmlFor="follow-up">Follow-up:</label>
                <select name="followup" value={followup} onChange={e => setFollowup(e.target.value)} required>
                  <option value=''></option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" placeholder="Rewards meeting"
                  value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="mid">MID:</label>
                <input type="number" name="mid" placeholder={followup === 'no' ? mid : 'Enter MID'}
                  value={mid} onChange={e => setMid(e.target.value)} 
                  disabled={followup === 'no'} required />
              </div>
              <div>
                <label htmlFor="dept">Dept/Team:</label>
                <input type="text" name="dept" placeholder="Reward Points Team"
                  value={dept} onChange={e => setDept(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="host">Host:</label>
                <input type="text" name="host" placeholder="Mr.Dharnesh"
                  value={host} onChange={e => setHost(e.target.value)} required />
              </div> 
              <div>
                <label htmlFor="desc">Description:</label>
                <input name="desc" type='text' value={desc} onChange={(e) => setDesc(e.target.value)} />
              </div>
            </div>
            <div className="right">
              <div>
                <label htmlFor="date">Date:</label>
                <input type="date" name="date"
                  value={date} onChange={e => setDate(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="time">Time:</label>
                <input type="time" name="time"
                  value={time} onChange={e => setTime(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="venue">Venue:</label>
                <input type="text" name="venue" placeholder="WW101"
                  value={venue} onChange={e => setVenue(e.target.value)} required/>
              </div>
              <div>
                <label htmlFor="members">Members:</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleAddMember}/>
                <div className="members-list">
                  {members.map((member, index) => (
                    <div className="each-member" key={index}>
                      <div className="memb-name">{member}</div>
                      <div className="x" onClick={() => setMembers(members.filter((i) => i !== member))}>x</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="update-btn">
            <button className='update-back' onClick={handleBack}>Back</button>
            <button className='update-submit' type="submit">Update</button>
          </div>
        </form>
    </div>
  )
}

export default UpdateMeetingDetails