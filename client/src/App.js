import { Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; 



function App() {
  return (
    <div className="dark border-2 flex justify-center p-3 ">
    <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    </Routes>
    </div>
  );
}

export default App;
