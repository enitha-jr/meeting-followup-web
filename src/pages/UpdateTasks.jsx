import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const UpdateTasks = () => {

    const { meetingid } = useParams()
    const [minute, setMinute] = useState('');
    const [task, setTask] = useState('');
    const [desc, setDesc] = useState('');
    const [assignby, setAssignby] = useState('');
    const [assignto, setAssignto] = useState('');
    const [date, setDate] = useState('');
    const [minutelist, setMinutelist] = useState([]);
    const [users, setUsers] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:5000/meetings/${meetingid}/tasks`)
          .then((response) => {
            console.log(response.data)
            setTask(response.data[0].task)
            setDesc(response.data[0].description)
            setAssignby(response.data[0].assignby)
            setAssignto(response.data[0].assignto)
            for (let item of response.data) {
              if (item.date) {
                item.date = String(item.date).split('T')[0];
                setDate(item.date)
              }
            }
          })
          .catch((error) => {
            console.log(error);
          })
    }, [])


    useEffect(() => {
    axios.get(`http://localhost:5000/meetings/${meetingid}/minutes`)
        .then((response) => {
        setMinutelist(response.data);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDate = new Date(date).toISOString().slice(0, 10);
        const values = { minute, task, desc, assignby, assignto, date: newDate };
        axios.put(`http://localhost:5000/meetings/updatetasks/${meetingid}`, values)
        .then((response) => {
            console.log(response.data);
            navigate(-1);
        })
        .catch((error) => {
            console.error('Error updating task:', error);
        });
    }
    
  return (
    <div className='task-form-content'>
        <div className='overlay'></div>
        <div className='task-form-container'>
        <div className='head4'>
            <h4>UPDATE TASK</h4>
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
            <input type='text' value={task} onChange={e => setTask(e.target.value)} required />
            </div>
            <div>
            <label>Description:</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} required />
            </div>
            <div>
            <label>Assigned By:</label>
            <input type='text' value={assignby} readOnly />
            </div>
            <div>
            <label>Assign To:</label>
            <select value={assignto} onChange={e => setAssignto(e.target.value)} required>
                <option value=''></option>
                {UsersOptions()}
            </select>
            </div>
            <div>
            <label>Due Date:</label>
            <input type='date' value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            <div className="meettask-btn">
            <button type="submit">UPDATE TASK</button>
            </div>
        </form>
        </div>
    </div>
  )
}


export default UpdateTasks