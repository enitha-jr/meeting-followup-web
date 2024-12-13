import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/UpdateMinutes.css'

const UpdateMinutes = () => {
  const { meetingid, minuteid } = useParams(); // Combine both params
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get(`http://localhost:5000/meetings/${meetingid}/minutes`)
      .then((response) => {
        response.data.map((eachminute) => {
            if (eachminute.minuteid == minuteid) {
                setNote(eachminute.minute)
            }
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }, [minuteid])

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    axios.put(`http://localhost:5000/meetings/${meetingid}/minutes/${minuteid}`, { minute: note })
      .then((response) => {
        console.log("Update successful:", response.data);
        navigate(-1)
      })
      .catch((error) => {
        console.error("Error updating minute:", error);
      });
  };

  return (
    <div className="minute-update-input">
      <div className='update-minutes-header'><h3>UPDATE-MINUTE</h3></div>
      <form className="minute-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={note}
          placeholder="Enter minutes"
          onChange={(e) => setNote(e.target.value)}
          required
        />
        <button type="submit" className="minute-update">Update</button>
      </form>
    </div>
  );
};

export default UpdateMinutes;
