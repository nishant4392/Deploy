import React from 'react';
import { Link } from 'react-router-dom';
const First = () => {

  return (
    <div>
      Hello there
      <Link to="/second">go to second</Link>
    </div>
  )
}

export default First
