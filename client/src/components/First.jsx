import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const First = () => {
  const [user,setUser] = useState();
  const [show,setShow]= useState(false)
  const getData = async(req,res)=>{
    let data = await fetch("http://localhost:5000/",{
      method:"get"
    });
    data = await data.json();
    console.log(data);
    setUser(data);
    setShow(true);
  }
  return (
    <div>
      Hello there
      <Link to="/second">go to second</Link>
      <button onClick={getData}> GET MY DATA</button>
      {
        show?<>{user.name}{user.class}{user.description}</>:<>no show</>
      }
    </div>
  )
}

export default First
