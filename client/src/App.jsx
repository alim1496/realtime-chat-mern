import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Room from './pages/Room';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ <Login />} />
        <Route path="/" element={ <Home />} />
        <Route path="/room/:id" element={ <Room />} />  
      </Routes>  
    </BrowserRouter>
  )
}

export default App
