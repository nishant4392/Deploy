import React from 'react'
import { Link } from 'react-router-dom'

const Second = () => {
  return (
    <div>
      Hello from second page 
      <Link to="/">go back</Link>
    </div>
  )
}

export default Second
