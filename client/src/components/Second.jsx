import React from 'react'
import { useNavigate } from 'react-router-dom'

const Second = () => {
    const navigate = useNavigate();
    const clicker = () => {
        navigate("/");
    }
    return (
        <div>
            Hello from second page
            <button onClick={clicker}>go back</button>
        </div>
    )
}

export default Second
