import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/Minutes.css'
import { FiPlus } from "react-icons/fi";
import { FiTrash2 } from 'react-icons/fi';
import {FiEdit} from 'react-icons/fi';
import { UserContext } from '../UserContext'
import { useContext } from 'react'
import { RiCheckboxCircleFill } from "react-icons/ri";

const Minutes = () => {
  const { userData } = useContext(UserContext);
  const { meetingid } = useParams()
  const [note, setNote] = useState("")
  const [istask,setIstask] =useState(0)

 

  const [minutelist, setMinutelist] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/meetings/${meetingid}/minutes`)
      .then((response) => {
        setMinutelist(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [])

  // console.log(minutelist);

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

  const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this minute?')) {
      handleDelete(id);
    }
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/meetings/${meetingid}/minutes/${id}`)
      .then((res) => {
        console.log(res.data);
        setMinutelist(minutelist.filter((minute) => minute.minuteid !== id));
      }).catch((err) => {
        console.log(err);
      });
  }

  const handleSubmit = async (e) => {
    const newminute = {minute:note, istask:istask , mid:meetingdetails.mid};
    await axios.post(`http://localhost:5000/meetings/${meetingid}/minutes`, newminute)
      .then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      });
    setNote('');
  }
  

  return (
    <div className='minute-content'>
      {minutelist.length>0 &&
        <div className="minute-container">
          <table className='minute-table'>
            <tbody>
              {minutelist.map((eachminute,index) => (
                <tr className='minute-table-row' key={index}>
                    <td>{index + 1}</td>
                    <td>{eachminute.minute}</td>
                    <td>{eachminute.istask ? <RiCheckboxCircleFill size={20} color="#0077B5"/> : <></>}</td>
                    {(userData?.username === meetingdetails?.host || userData?.username === meetingdetails?.minutetaker) &&(
                      <td className='minute-handlers'>
                        <Link to={`/meetings/${meetingid}/updateminutes/${eachminute.minuteid}`}><FiEdit color="#055aba" type='submit' role='button' className='minute-edit'/></Link>
                        <FiTrash2 color="#bb2124" type='submit' role='button' className='minute-delete' onClick={() => confirmDelete(eachminute.minuteid)} />
                      </td>
                    )
                    }
                    
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      {
        meetingdetails.status === 'ongoing' && (userData?.username === meetingdetails?.host || userData?.username === meetingdetails?.minutetaker) &&(
        <div className="minute-input">
          <form className="minute-form" onSubmit={handleSubmit}>
            <input type="text" value={note} placeholder="Enter minutes"
              onChange={e => setNote(e.target.value)} required />
            <input type="checkbox" value={istask}
             onChange={e => setIstask(e.target.checked ? 1 : 0)} />
            <button type="submit" className="minute-add"> <FiPlus/> </button>
          </form> 
        </div>
        )
      }
    </div>
  )
}

export default Minutes