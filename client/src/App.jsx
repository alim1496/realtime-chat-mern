import { createContext, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css'
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Room from './pages/Room';

export const MainContext = createContext();

function App() {
  const [room, setRoom] = useState("");
  const [socket, setSocket] = useState(null);

  return (
    <MainContext.Provider value={{
      room, socket, setRoom, setSocket
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <Login />} />
          <Route path="/" exact element={<ProtectedRoute />}>
            <Route path="/" exact element={ <Home />} />
          </Route>
          <Route path="/chat" exact element={<ProtectedRoute />}>
            <Route path="/chat" element={ <Room />} />
          </Route>  
        </Routes>  
      </BrowserRouter>
    </MainContext.Provider>
  )
}

export default App
