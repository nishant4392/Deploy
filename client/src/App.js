import { Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; 
import NavBar from './components/NavBar';
import { useEffect} from 'react';
import {initFlowbite} from "flowbite"
import Toast from './TailwindComponents/Toast';
import { State } from './Context/stateProvider';

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
    </Routes>
    </div>
  );
}

export default App;
