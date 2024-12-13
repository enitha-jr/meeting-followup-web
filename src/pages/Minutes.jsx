import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import './styles/Minutes.css'
import { FiPlus } from "react-icons/fi";
import { FiTrash2 } from 'react-icons/fi';
import {FiEdit} from 'react-icons/fi';

const Minutes = () => {
  const { meetingid } = useParams()
  const [note, setNote] = useState("")
  const handleSubmit = async (e) => {
    // e.preventDefault();
    const newminute = {minute:note};
    // console.log(newminute);
    // console.log(meetingid);
    await axios.post(`http://localhost:5000/meetings/${meetingid}/minutes`, newminute)
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
    <div className='minute-content'>
      {minutelist.length>0 &&
        <div className="minute-container">
          <table className='minute-table'>
            <tbody>
              {minutelist.map((eachminute,index) => (
                <tr className='minute-table-row' key={index}>
                  <div>
                    <td>{index + 1}</td>
                    <td>{eachminute.minute}</td>
                  </div>
                  <div className='minute-handlers'>
                    <FiEdit color="	#055aba" type='submit' role='button' className='minute-edit'/>
                    <FiTrash2 color="#bb2124" type='submit' role='button' className='minute-delete'/>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      {
        meetingdetails.status === 'ongoing' &&
        <div className="minute-input">
          <form className="minute-form" onSubmit={handleSubmit}>
            <input type="text" value={note} placeholder="Enter minutes"
              onChange={e => setNote(e.target.value)} required />
            <button type="submit" className="minute-add"> <FiPlus/> </button>
          </form>
        </div>
      }
    </div>
  )
}

export default Minutes