import './App.css';
import { Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import { Button } from "@/components/ui/button"



function App() {
  return (
    <div className="App">
    <Login/>
    <Register/>
    <Routes>
    <Route path='/' element={<div className='text-3xl font-bold underline'>hello</div>}/>
    </Routes>
    </div>
  );
}

export default App;
