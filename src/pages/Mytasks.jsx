import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext'
import { useContext } from 'react'
import './styles/Mytasks.css'
import { SlClose } from "react-icons/sl";

const Mytasks = () => {
  
  const { userData } = useContext(UserContext);
  const [tasklist, setTasklist] = useState([])
  const [selectedTask, setSelectedTask] = useState(null);

  const [showpopup, setShowpopup] = useState(false);
  const showTaskform = (task) => {
    setSelectedTask(task);
    setShowpopup(!showpopup)
  }

  const handleSubmit = (taskid) => {
    console.log(taskid);
    try {
      axios.put(`http://localhost:5000/meetings/updatemytasks`, { id: taskid })
    } catch (error) {
      console.log(error);
    };
  }

  useEffect(() => {
    // console.log(userData);
    if (userData?.username) {
      axios.post(`http://localhost:5000/meetings/mytasks`, { username: userData.username })
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
    }
  }, [userData.username, handleSubmit])

  return (
    <div className='mytasks-content'>
      {!tasklist.length ? (<div className='no-tasks'>No tasks assigned !</div>) :
        <div className="mytasks-container">
          <table className='mytasks-table'>
            <tbody>
              {tasklist.map((eachtask, index) => (
                <tr className='mytasks-table-row' key={index}>
                  <td>{index + 1}</td>
                  <td onClick={() => showTaskform(eachtask)}>{eachtask.task}</td>
                  <td onClick={() => showTaskform(eachtask)}>{eachtask.date}</td>
                  <td>
                    {eachtask.status === "assigned" ? (
                      <button className={`mytasks-status-btn ${eachtask.status}`}>SUBMIT</button>
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
                <label>Due Date:</label>
                <div>{selectedTask.date}</div>
              </div>
              <div className="mytasks-btn">
                  {selectedTask.status === "assigned" ? (
                    <button className={`mytasks-status-btn ${selectedTask.status}`} onClick={() => { handleSubmit(selectedTask.taskid); showTaskform(false); }}>SUBMIT</button>
                  ) : selectedTask.status === "pending" ? (
                    <button className={`mytasks-status-btn ${selectedTask.status}`} onClick={() => { handleSubmit(selectedTask.taskid); showTaskform(false); }}>PENDING</button>
                  ) : selectedTask.status === "completed" ? (
                    <button className={`mytasks-status-btn ${selectedTask.status}`}>COMPLETED</button>
                  ) : (
                    <></>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Mytasks