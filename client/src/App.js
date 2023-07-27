import './App.css';
import { Routes,Route} from 'react-router-dom';
import Button from '@mui/material/Button';



function App() {
  return (
    <div className="App">
    <Button variant="text">Text</Button>
    <Routes>
    <Route path='/' element={<div>hello</div>}/>
    </Routes>
    </div>
  );
}

export default App;
