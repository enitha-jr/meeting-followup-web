import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./styles/Attendance.css"
import { FaSearch } from 'react-icons/fa'

const Attendance = () => {
  const { meetingid } = useParams()
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:5000/meetings/${meetingid}/members`)
      .then((response) => {
        setMembers(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [meetingid])
  const filteredmember = members.filter((member) => {
    return (
      member.staffname.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCheck = (attendanceid,currentstatus) => {
    console.log("Clicked attendanceid:", attendanceid); 

    setMembers(prevMembers => 
      prevMembers.map(member => 
        member.attendanceid === attendanceid 
          ? { ...member, status: currentstatus === 1 ? 0 : 1 }
          : member
      )
    );
    axios.put(`http://localhost:5000/meetings/attendance`, {attendanceid: attendanceid} )
      .then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
        setMembers(prevMembers => 
          prevMembers.map(member => 
            member.attendanceid === attendanceid 
              ? { ...member, status: currentstatus === 1 ? 0 : 1 }
              : member
          )
        );
      });
  }

  return (
    <div className='attendance-content'>
      <div className="search-container">
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search" className="search-input" onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>
      {filteredmember.length > 0 &&
        <div className="attendance-container">
          <table className='attendance-table'>
            <tbody>
              {filteredmember.map((eachmember, index) => (
                <tr className='attendance-table-row' key={index}>
                  <td>{index + 1}</td>
                  <td>{eachmember.staffname}</td>
                  <td>
                    <button
                      className={`attendance-btn ${eachmember.status === 1 ? 'present' : 'absent'}`}
                      onClick={() => handleCheck(eachmember.attendanceid, eachmember.status)}>
                      {eachmember.status === 0 ? 'ABSENT' : 'PRESENT'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

export default Attendance