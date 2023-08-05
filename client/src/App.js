import { Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; 
import NavBar from './components/NavBar';
import { useEffect } from 'react';
import {initFlowbite} from "flowbite"



function App() {
  useEffect(()=>{
    initFlowbite();
  },[]);
  return (
    <div className="dark ">
    <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/navbar' element={<NavBar/>}/>
    </Routes>
    </div>
  );
}

export default App;
