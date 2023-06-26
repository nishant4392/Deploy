import './App.css';
import First from './components/First';
import Second from './components/Second';
import { Routes,Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
    <Routes>
    <Route path='/second' element={<Second/>}/>
    <Route path='/' element={<First/>}/>
    </Routes>
    </div>
  );
}

export default App;
