import React from 'react'
import './styles/Nav1.css'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { useContext } from 'react'
import { useState,useEffect} from 'react'
import axios from 'axios'

const Nav2 = ({meetingid}) => {
  const { userData } = useContext(UserContext);
  const [meetingdetails, setMeetingdetails] = useState([]);
  useEffect(() => {
    if (meetingid) {
      axios.get(`http://localhost:5000/meetings/${meetingid}/details`)
        .then((response) => {
          setMeetingdetails(response.data[0]);
        })
        .catch((error) => {
          console.error('Error fetching meeting details:', error);
        });
    }
  }, []);
  return (
    <div className="navbar1">
        <NavLink to={`/meetings/${meetingid}/details`}>
          <div className="nav1-button">
            Details
          </div>
        </NavLink>
        <NavLink to={'/meetings/' + meetingid + '/minutes'}>
          <div className="nav1-button">
            Minutes
          </div>
        </NavLink>
        <NavLink to={`/meetings/${meetingid}/tasks`}>
          <div className="nav1-button">
            Tasks
          </div>
        </NavLink>
        {
          userData?.username === meetingdetails?.host && meetingdetails?.minutetaker &&(
            <>
              <NavLink to={`/meetings/${meetingid}/attendance`}>
                <div className="nav1-button">
                  Attendance
                </div>
              </NavLink>
              <NavLink to={`/meetings/${meetingid}/report`}>
                <div className="nav1-button">
                  Report
                </div>
              </NavLink>
            </>
          )
        }
        
    </div>
  )
}

export default Nav2 