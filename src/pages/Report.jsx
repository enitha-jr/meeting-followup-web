import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext'
import { useContext } from 'react'
import './styles/Mytasks.css'
import { useParams } from 'react-router-dom'

const Report = () => {
  const { meetingid } = useParams();
  const { userData } = useContext(UserContext);
  const [tasklist, setTasklist] = useState([])
  const [notasklist, setNotasklist] = useState([])
  const [selectedTask, setSelectedTask] = useState(null);

  const [showpopup, setShowpopup] = useState(false);
  const showTaskform = (task) => {
    setSelectedTask(task);
    setShowpopup(!showpopup)
  }

  useEffect(() => {
    // console.log(userData);
    if (userData?.username) {
      axios.get(`http://localhost:5000/meetings/${meetingid}/alltasks`)
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
  }, [userData.username])

  useEffect(() => {
    // console.log(userData);
    if (userData?.username) {
      axios.get(`http://localhost:5000/meetings/${meetingid}/notassigned`)
        .then((response) => {
          setNotasklist(response.data);
        }).catch((error) => {
          console.log(error);
        });
    }
  })

  return (
    <div className='mytasks-content'>
      {tasklist.length > 0 &&
        <div className="mytasks-container">
          <table className='mytasks-table'>
            <tbody>
              {tasklist.map((eachtask, index) => (
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
      {notasklist.length > 0 &&
        <div className="mytasks-container">
          <table className='mytasks-table'>
            <tbody>
              {notasklist.map((item, index) => (
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
    </div>
  )
}

export default Report