import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';

const Minutes = () => {
    const { meetingid } = useParams()
    const [note, setNote] = useState("")
    const handleSubmit = async (e) => {
      // e.preventDefault();
      const newminute = { meetingid,minute:note};
      console.log(newminute);
      console.log(meetingid);
      axios.post(`http://localhost:5000/meetings/${meetingid}/minutes/post`, newminute)
        .then((response) => {
          console.log(response.data);
        }).catch((error) => {
          console.log(error);
        });
      setNote('');
    }

    const [minutelist, setMinutelist] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/meetings/${meetingid}/minutes`)
        .then((response) => {
            setMinutelist(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [])


  return (
    <div>
      <div className="minute-container">
        <h5>MINUTES</h5>
        {minutelist.map((eachminute)=>(
          <div className='minute-table' key={eachminute.minuteid}>
            <ul>
              <li>{eachminute.minute}</li>
            </ul>
          </div>
        ))}
      </div>
      <div className="minute-input">
        <form onSubmit={handleSubmit}>
              <input type="text" value={note} placeholder="Enter minutes" 
              onChange={e => setNote(e.target.value)} />
              <button type="submit" className="minute-add"> + </button>
        </form>
      </div>
    </div>
  )
}

export default Minutes