import { Routes,Route} from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register'; 
import NavBar from './components/NavBar';
import { useEffect} from 'react';
import {initFlowbite} from "flowbite"
import Toast from './TailwindComponents/Toast';
import { State } from './Context/stateProvider';
import ResetPassword from './components/Auth/ResetPassword';


function App() {
  const {toast} = State();

  useEffect(()=>{
    initFlowbite();
  },[]);

  return (
    <div className="dark ">
    <Toast toast={toast}/>
    <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/navbar' element={<NavBar/>}/>
    <Route path='/reset-password/:userId' element={<ResetPassword/>}/>
    </Routes>
    </div>
  );
}

export default App;
