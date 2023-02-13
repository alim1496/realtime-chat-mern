import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { MainContext } from '../App';

const _socket = io.connect('http://localhost:4000');

const Home = () => {
  const { setSocket, setRoom } = useContext(MainContext);
  const navigate = useNavigate();
  setSocket(_socket);
  const [publicRooms, setPublicRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/rooms")
    .then(res => res.json())
    .then(({ result }) => {
      setPublicRooms(result);
    })
    .catch(err => console.log(err));
  }, []);

  const doLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userID");
    navigate("/login");
  };

  const joinRoom = (room) => {
    const username = localStorage.getItem("username");
    setRoom(room);
    _socket.emit("join_room", { username, room });
    navigate(`/room/${room}`);
  };

  return (
    <div className="container p-4 bg-slate-50 h-screen">
      <div className="flex justify-between">
        <span className="text-lg">{localStorage.getItem("username")}</span>
        <span className="font-bold hover:cursor-pointer" onClick={doLogout}>Logout</span>
      </div>
      <div className="mb-4">
        <h3 className="font-bold mb-2 text-xl">Rooms</h3>
        <div className="flex flex-wrap">
          {publicRooms && publicRooms.map((room, index) => (
            <div className="w-72 rounded shadow-lg mr-2 mb-2 bg-white p-2" key={index}>
              <img src={room.cover} alt="cover" className="w-full h-36 mb-1" />
              <div className="font-bold px-1">{room.name}</div>
              <div className="px-1 text-xs mb-1">{room.description}</div>
              <button className="bg-blue-500 text-white w-full py-2 rounded hover:opacity-80" onClick={()=>joinRoom(room._id)}>
                Join Room
              </button>
            </div>
          ))}
        </div>
      </div> 
    </div>
  );
};

export default Home;