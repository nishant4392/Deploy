import './App.css';
import { Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';



function App() {
  return (
    <div className="App">
    <Login/>
    <Register/>
    <Routes>
    <Route path='/' element={<div>hello</div>}/>
    </Routes>
    </div>
  );
}

export default App;
