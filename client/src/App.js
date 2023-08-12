import { Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; 
import Home from './components/Home';



function App() {
  return (
    <div className="dark border-2 flex justify-center p-3 min-h-screen items-center overflow-hidden">
    <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/navbar' element={<Home/>}/>
    </Routes>
    </div>
  );
}

export default App;
