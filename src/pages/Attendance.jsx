import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./styles/Attendance.css"

const Attendance = () => {
  const { meetingid } = useParams()
  const [members, setMembers] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/meetings/${meetingid}/members`)
      .then((response) => {
        setMembers(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [])

  const handleCheck=(e)=>{
    axios.post(`http://localhost:5000/meetings/${meetingid}/attendance`,{attendance:e.target.value})
      .then((response)=>{
        console.log(response.data);
      }).catch((error)=>{
        console.log(error);
      });
    }
  return (
    <div className='attendance-content'>
      {members.length>0 &&
        <div className="attendance-container">
          <table className='attendance-table'>
            <tbody>
              {members.map((eachmember,index) => (
                <tr className='attendance-table-row' key={index}>
                  <td>{index + 1}</td>
                  <td>{eachmember.staffname}</td>
                  <td><input type="checkbox" value={eachmember.staffname} onChange={handleCheck} defaultChecked={eachmember.status ===1}></input></td>
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