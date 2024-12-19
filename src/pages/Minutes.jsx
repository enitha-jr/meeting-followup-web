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

  const [showpopup, setShowpopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const showTaskform = (task) => {
    setSelectedTask(task);
    setShowpopup(!showpopup)
  }
  

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

  const [tobediscussed, setTobediscussed] = useState([]);
  const [notassigned, setNotassigned] = useState([]);
  
  useEffect(() => {
    // console.log(userData);
    if (userData?.username) {
      axios.post(`http://localhost:5000/meetings/${meetingid}/tobediscussed/alltasks`,{mid:meetingdetails.mid})
        .then((response) => {
          for (let item of response.data) {
            if (item.date) {
              item.date = String(item.date).split('T')[0];
            }
          }
          setTobediscussed(response.data);
        }).catch((error) => {
          console.log(error);
        });
    }
  }, [meetingdetails])

  useEffect(() => {
    // console.log(userData);
    if (userData?.username) {
      axios.post(`http://localhost:5000/meetings/${meetingid}/tobediscussed/notassigned`,{mid:meetingdetails.mid})
        .then((response) => {
          setNotassigned(response.data);
        }).catch((error) => {
          console.log(error);
        });
    }
  }, [meetingdetails])

  console.log(tobediscussed);
  console.log(notassigned);

  return (
    <div className='minute-content'>
      {
        tobediscussed.length > 0 && meetingdetails.followup === 'yes' &&
        <div className="mytasks-container">
          <h3 className='head3'>To be discussed</h3>
          <table className='mytasks-table'>
            <tbody>
              {tobediscussed.map((eachtask, index) => (
                <tr className='mytasks-table-row' key={index} onClick={() => showTaskform(eachtask)}>
                  <td>{index + 1}</td>
                  <td>{eachtask.task}</td>
                  <td>{eachtask.date}</td>
                  <td>
                    {eachtask.status === "assigned" ? (
                      <button className={`mytasks-status-btn ${eachtask.status}`}>ASSIGNED</button>
                    ) : eachtask.status === "pending" ? (
                      <button className={`mytasks-status-btn ${eachtask.status}`}>PENDING</button>
                    ) : eachtask.status === "completed" ? (
                      <button className={`mytasks-status-btn ${eachtask.status}`}>COMPLETED</button>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      {showTaskform && selectedTask && (
        <div className='task-content'>
          <div className='overlay' onClick={() => showTaskform(false)}></div>
          <div className='mytask-popup-container'>
            <div className='head4'>
              <h4>TASK DETAILS</h4>
            </div>
            <div className='mytask-card'>
              <div>
                <label>Task:</label>
                <div>{selectedTask.task}</div>
              </div>
              <div>
                <label>Description:</label>
                <div>{selectedTask.description}</div>
              </div>
              <div>
                <label>Assigned By:</label>
                <div>{selectedTask.assignby}</div>
              </div>
              <div>
                <label>Assigned To:</label>
                <div>{selectedTask.assignto}</div>
              </div>
              <div>
                <label>Due Date:</label>
                <div>{selectedTask.date}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {notassigned.length > 0 && meetingdetails.followup === 'yes' && 
        <div className="mytasks-container">
          <h3 className='head3'>Not Assigned</h3>
          <table className='mytasks-table'>
            <tbody>
              {notassigned.map((item, index) => (
                <tr className='mytasks-table-row' key={index}>
                  <td>{index + 1}</td>
                  <td>{item.minute}</td>
                  <td>
                    <button className={`mytasks-status-btn ${item.status}`}>NOT ASSIGNED</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      {minutelist.length>0 &&
        <div className="minute-container">
          <h3 className='head3'>Minutes</h3>
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