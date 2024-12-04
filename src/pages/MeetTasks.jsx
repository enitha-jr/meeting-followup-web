import React from 'react'
import { FiPlus } from "react-icons/fi";
import './styles/MeetTasks.css'
import { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { SlClose } from "react-icons/sl";
import axios from 'axios';

const MeetTasks = () => {
  const [showForm, setShowForm] = useState(false);
  const showTaskform = () => {
    setShowForm(!showForm)
  }
  const { meetingid } = useParams()
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

  const MinuteOptions = () => {
    return minutelist.map((minute) => (
      <option key={minute.minuteid}>{minute.minute}</option>
    ))
  }
  const [minute, setMinute] = useState('');
  const [task, setTask] = useState('');
  const [desc, setDesc] = useState('');
  const [assign, setAssign] = useState('');
  const [date, setDate] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDate = new Date(date).toISOString().slice(0,10);
    const newTask = {minute,task,desc,assign, date:newDate };
    setTasklist([...tasklist, newTask]);
    axios.post(`http://localhost:5000/meetings/${meetingid}/tasks`, newTask)
      .then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      });
    setMinute('');
    setTask('');
    setDesc('');
    setAssign('');
    setDate('');
    setShowForm(false);
  }
  const [tasklist, setTasklist] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/meetings/${meetingid}/tasks`)
      .then((response) => {
        for (let item of response.data) {
          if (item.date) {
            item.date = String(item.date).split('T')[0];
          }
        }
        setTasklist(response.data);
      }).catch((error) => {
        console.log(error);
      });
  },[tasklist])
  // console.log(tasklist);


  return (
    <div className='meettask-content'>
      <div className='add-button' onClick={showTaskform} ><FiPlus/>ADD</div>
      {
        tasklist.length > 0 &&
        <div className='task-container'>
          <table className='task-table'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Task</th>
                <th>Description</th>
                <th>Assigned To</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasklist.map((eachtask,index) => (
                <tr className='task-table-row' key={index}>
                  {console.log(eachtask)}
                  <td>{index + 1}</td>
                  <td>{eachtask.task}</td>
                  <td>{eachtask.description}</td>
                  <td>{eachtask.assigned}</td>
                  <td>{eachtask.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      {showForm && (
        <div className='task-form-content'>
          <div className='overlay' onClick={showTaskform}></div>
          <div className='task-form-container'>
            <div className='head4'>
              <h4>ADD NEW TASK</h4>
            </div>
            <form className='meettask-form' onSubmit={handleSubmit}>
              <div>
                <label>Minute:</label>
                <select onChange={e => setMinute(e.target.value)} required>
                  <option value=''></option>
                  {MinuteOptions()}
                </select>
              </div>
              <div>
                <label>Task:</label>
                <input type='text' onChange={e => setTask(e.target.value)} required/>
              </div>
              <div>
                <label>Description:</label>
                <textarea onChange={e => setDesc(e.target.value)} required/>
              </div>
              <div>
                <label>Assign To:</label>
                <input type='text' onChange={e => setAssign(e.target.value)} required/>
              </div>
              <div>
                <label>Due Date:</label>
                <input type='date' onChange={e => setDate(e.target.value)}required/>
              </div>
              <div className="meettask-btn">
                <button type="submit" >CREATE TASK</button>
              </div>
            </form>
          </div> 
          <div className='close-btn'onClick={showTaskform}><SlClose /></div>
        </div>
      )}
    </div>
  )
}

export default MeetTasks