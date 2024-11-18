import React from 'react'
import './styles/Nav1.css'
import { NavLink } from 'react-router-dom'


const Nav2 = ({id}) => {
  return (
    <div className="navbar1">
        <NavLink to={`/meetings/${id}/details`}>
          <div className="nav1-button">
            Details
          </div>
        </NavLink>
        <NavLink to={'/meetings/' + id + '/minutes'}>
          <div className="nav1-button">
            Minutes
          </div>
        </NavLink>
        <NavLink to={`/meetings/${id}/tasks`}>
          <div className="nav1-button">
            Tasks
          </div>
        </NavLink>
        <NavLink to={`/meetings/${id}/attendance`}>
          <div className="nav1-button">
            Attendance
          </div>
        </NavLink>
        <NavLink to={`/meetings/${id}/report`}>
          <div className="nav1-button">
            Report
          </div>
        </NavLink>
    </div>
  )
}

export default Nav2 