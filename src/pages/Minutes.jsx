import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import './styles/Minutes.css'
import { FiPlus } from "react-icons/fi";

const Minutes = () => {
  const { meetingid } = useParams()
  const [note, setNote] = useState("")
  const handleSubmit = async (e) => {
    // e.preventDefault();
    const newminute = { meetingid, minute: note };
    // console.log(newminute);
    // console.log(meetingid);
    axios.post(`http://localhost:5000/meetings/${meetingid}/minutes`, newminute)
      .then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      });
    setNote('');
  }

  //changes added

  const [minutelist, setMinutelist] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/meetings/${meetingid}/minutes`)
      .then((response) => {
        setMinutelist(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [])
  // console.log(response.data);

  const [meetingdetails, setMeetingdetails] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/meetings/${meetingid}/details`)
      .then((response) => {
        setMeetingdetails(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [])

  // console.log(meetingdetails.status)

  return (
    <div className='minute-content'>
      {minutelist.length>0 &&
        <div className="minute-container">
          <table className='minute-table'>
            <tbody>
              {minutelist.map((eachminute, index) => (
                <tr className='minute-table-row' key={eachminute.minuteid}>
                  <td>{index + 1}</td><td>{eachminute.minute}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }

      <div className="minute-input">
        <form onSubmit={handleSubmit}>
          <input type="text" value={note} placeholder="Enter minutes"
            onChange={e => setNote(e.target.value)} required />
          <button type="submit" className="minute-add"> <FiPlus /> </button>
        </form>
      </div>
    </div>
  )
}

export default Minutes