import React from 'react'
import { useParams } from 'react-router-dom'

const Minutes = () => {
    const { id } = useParams()
    console.log(id)
  return (
    <div>Minutes</div>
  )
}

export default Minutes