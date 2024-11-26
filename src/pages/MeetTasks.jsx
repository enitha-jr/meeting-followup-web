import React from 'react'
import { FiPlus } from "react-icons/fi";
import './styles/MeetTasks.css'

const MeetTasks = () => {
  return (
    <div className='meettask-content'>
      <div className='add-button' onclick ><FiPlus/>ADD</div>
    </div>
  )
}

export default MeetTasks