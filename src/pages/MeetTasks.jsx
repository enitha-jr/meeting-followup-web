import React from 'react'
import { FiPlus } from "react-icons/fi";
import './styles/MeetTasks.css'
import { useState } from 'react';

const MeetTasks = () => {
  const [showForm, setShowForm] = useState(false);
  const showTaskform = () => {
    setShowForm(!showForm)

    console.log("show task form")
  }
  return (
    <div className='meettask-content'>
      <div className='add-button' onClick={showTaskform} ><FiPlus/>ADD</div>
      {
        showForm && 
        <div className='task-container'>
          <div>
            <h5>ASSIGN TASK</h5>
          </div>
          <form>
            <h1>hii</h1>
          </form>
        </div>
      }
    </div>
  )
}

export default MeetTasks