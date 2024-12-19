import React, { useState, useEffect, useContext } from 'react';
import { FiPlus } from "react-icons/fi";
import './styles/MeetTasks.css'
import { Link, useParams } from 'react-router-dom';
import { SlClose } from "react-icons/sl";
import axios from 'axios';
import { UserContext } from '../UserContext';
import { FiEdit } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

const MeetTasks = () => {

  const { meetingid } = useParams();
  const { userData } = useContext(UserContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showpopup, setShowpopup] = useState(false);

  const [minute, setMinute] = useState('');
  const [task, setTask] = useState('');
  const [desc, setDesc] = useState('');
  const [assignby, setAssignby] = useState(userData?.username || '');
  const [assignto, setAssignto] = useState('');
  const [date, setDate] = useState('');

  const [minutelist, setMinutelist] = useState([]);
  const [users, setUsers] = useState([]);

// console.log(meetingid)
  useEffect(() => {
    axios.get(`http://localhost:5000/meetings/${meetingid}/taskminutes`)
      .then(response => {
        setMinutelist(response.data)
      })
      .catch(error => console.log(error));
  }, [meetingid]);

  useEffect(() => {
    axios.get(`http://localhost:5000/users`)
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/meetings/${meetingid}/tasks`)
      .then(response => {
        const formattedTasks = response.data.map(item => {
          if (item.date) item.date = String(item.date).split('T')[0];
          return item;
        });
        setTasklist(formattedTasks);
      })
      .catch(error => console.log(error));
  }, [meetingid]);

  const MinuteOptions = () => (
    minutelist.length ? minutelist.map(minute => (
      <option key={minute.minuteid} value={minute.minute}>{minute.minute}</option>
    )) : null
  );

  const UsersOptions = () => (
    users.length ? users.map(user => (
      <option key={user.userid} value={user.username}>{user.username}</option>
    )) : null
  );

  const showTaskform = (task = null) => {
    setSelectedTask(task);
    setShowpopup(true);
  };

  const handleClose = () => {
    setShowpopup(false);
    setSelectedTask(null);
    setAssignby(userData?.username || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDate = new Date(date).toISOString().slice(0, 10);
    const newTask = { minute, task, desc, assignby, assignto, date: newDate };
    setTasklist([...tasklist, newTask]);
    axios.post(`http://localhost:5000/meetings/${meetingid}/tasks`, newTask)
      .then((response) => {
        handleClose();

      }).catch((error) => {
        console.log(error);
      });
    setMinute('');
    setTask('');
    setDesc('');
    setAssignby('');
    setAssignto('');
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
  }, [tasklist])
  // console.log(tasklist);

  const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      handleDelete(id);
    }
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/meetings/${meetingid}/tasks/${id}`)
      .then((res) => {
        console.log(res.data);
        setMinutelist(tasklist.filter((task) => task.taskid !== id));
        showTaskform(false)
        handleClose();
      }).catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='meettask-content'>
      <div className='add-button' onClick={() => showTaskform()}><FiPlus /> ADD</div>
      {tasklist.length > 0 ? (
        <div className='task-container'>
          <table className='task-table'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Task</th>
                <th>Assigned By</th>
                <th>Assigned To</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasklist.map((eachtask, index) => (
                <tr className='task-table-row' key={index} onClick={() => showTaskform(eachtask)}>
                  <td>{index + 1}</td>
                  <td>{eachtask.task}</td>
                  <td>{eachtask.assignby}</td>
                  <td>{eachtask.assignto}</td>
                  <td>{eachtask.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='task-container'>No Data</div>
      )}

      {showpopup && (
        <div className='task-content'>
          <div className='overlay' onClick={handleClose}></div>
          <div className='mytask-popup-container'>
            <div className='head4'>
              <h4>{selectedTask ? 'TASK DETAILS' : 'ADD NEW TASK'}</h4>
            </div>
            {selectedTask ? (
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
                <div className='task-btn'>
                  <Link to={`/meetings/${meetingid}/updatetasks/${selectedTask.taskid}`}><FiEdit color="#055aba" size={20} className='task-edit-button' type='submit' role='button' /></Link>
                  <FiTrash2 color="#bb2124" size={20} type='submit' role='button' onClick={() => confirmDelete(selectedTask.taskid)} />
                </div>
              </div>
            ) : (
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
                  <input type='text' value={assignby} readOnly />
                </div>
                <div>
                  <label>Assigned To:</label>
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
            )}
            <div className='close-btn' onClick={handleClose}><SlClose size={30} color='#fff' /></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetTasks;
