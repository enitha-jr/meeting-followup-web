import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { UserContext } from '../UserContext'
import { useContext } from 'react'

const Tobediscussed = () => {
    const { meetingid } = useParams()
    const [showpopup, setShowpopup] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const { userData } = useContext(UserContext);

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


    const [tobediscussed, setTobediscussed] = useState([]);
    const [notassigned, setNotassigned] = useState([]);

    useEffect(() => {
        if (userData?.username) {
            axios.post(`http://localhost:5000/meetings/${meetingid}/tobediscussed/alltasks`, { mid: meetingdetails.mid })
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
            axios.post(`http://localhost:5000/meetings/${meetingid}/tobediscussed/notassigned`, { mid: meetingdetails.mid })
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
            <div className="mytasks-container">
                {
                    tobediscussed.length > 0 && meetingdetails.followup === 'yes' &&
                    <>
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
                    </>
                }
                {notassigned.length > 0 && meetingdetails.followup === 'yes' &&
                    <>
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
                    </>
                }
            </div>
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

export default Tobediscussed