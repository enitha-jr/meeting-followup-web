import React from 'react'
import { FiPlus } from "react-icons/fi";
import './styles/MeetTasks.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SlClose } from "react-icons/sl";
import axios from 'axios';
import { UserContext } from '../UserContext'
import { useContext } from 'react'

const MeetTasks = () => {

  const { meetingid } = useParams()
  const [minute, setMinute] = useState('');
  const [task, setTask] = useState('');
  const [desc, setDesc] = useState('');
  const [assignby, setAssignby] = useState('');
  const [assignto, setAssignto] = useState('');
  const [date, setDate] = useState('');

  const [minutelist, setMinutelist] = useState([]);
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([])

  const { userData } = useContext(UserContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/meetings/${meetingid}/minutes`)
      .then((response) => {
        setMinutelist(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [meetingid])

  useEffect(() => {
    axios.get(`http://localhost:5000/meetings/${meetingid}/members`)
      .then((response) => {
        setMembers(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [meetingid])

  useEffect(() => {
    axios.get(`http://localhost:5000/users`)
      .then((response) => {
        setUsers(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [])

  const MinuteOptions = () => {
    
    if (minutelist.length) {

      return minutelist.map((minute) => (
        <option key={minute.minuteid}>{minute.minute}</option>
      ))
    }
    else {
      return <></>
    }

  }
  const MembersOptions = () => {
    if (members.length) {

      return members.map((member) => (
        <option key={member.attendanceid}>{member.staffname}</option>
      ))
    }
    else {
      return <></>
    }
  }
  const UsersOptions = () => {
    if (users.length) {

      return users.map((user) => (
        <option key={user.userid}>{user.username}</option>
      ))
    }
    else {
      return <></>
    }
  }
  const [showForm, setShowForm] = useState(false);
  const showTaskform = () => {
    setShowForm(!showForm)
  }

  const [tasklist, setTasklist] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDate = new Date(date).toISOString().slice(0, 10);
    const newTask = { minute, task, desc, assignby, assignto, date: newDate };
    console.log(newTask)
    try {
      await axios.post(`http://localhost:5000/meetings/${meetingid}/tasks`, newTask)
      setTasklist([...tasklist, newTask]);

      setMinute('');
      setTask('');
      setDesc('');
      setAssignby('');
      setAssignto('');
      setDate('');
      setShowForm(false);
    } catch (error) {
      console.log(error);
    };
  }


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
  }, [tasklist])

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
  }, [meetingid]);

  const handleFilter = () => {
    let filteredResults = tasklist.filter((eachtask) =>
      userData?.username === meetingdetails?.host ||
      eachtask.assignby === userData?.username
    )
    return filteredResults
  }
  const filteredResults = handleFilter()

  return (
    <div className='meettask-content'>
      <div className='add-button' onClick={showTaskform} ><FiPlus />ADD</div>
      {
        !filteredResults.length ? (<div className='task-container'>No Data</div>) : (
          <div className='task-container'>
            <table className='task-table'>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Assigned By</th>
                  <th>Assigned To</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredResults.map((eachtask, index) => (
                    <tr className='task-table-row' key={index}>
                      <td>{index + 1}</td>
                      <td>{eachtask.task}</td>
                      <td>{eachtask.description}</td>
                      <td>{eachtask.assignby}</td>
                      <td>{eachtask.assignto}</td>
                      <td>{eachtask.date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )
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
                <input type='text' onChange={e => setTask(e.target.value)} required />
              </div>
              <div>
                <label>Description:</label>
                <textarea onChange={e => setDesc(e.target.value)} required />
              </div>
              <div>
                <label>Assigned By:</label>
                <select onChange={e => setAssignby(e.target.value)} required>
                  <option value=''></option>
                  {MembersOptions()}
                </select>
              </div>
              <div>
                <label>Assign To:</label>
                <select onChange={e => setAssignto(e.target.value)} required>
                  <option value=''></option>
                  {UsersOptions()}
                </select>
              </div>
              <div>
                <label>Due Date:</label>
                <input type='date' onChange={e => setDate(e.target.value)} required />
              </div>
              <div className="meettask-btn">
                <button type="submit">CREATE TASK</button>
              </div>
            </form>
            <div className='close-btn' onClick={showTaskform}><SlClose size={30} color='#fff' /></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MeetTasks