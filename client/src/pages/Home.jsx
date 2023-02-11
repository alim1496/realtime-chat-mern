import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { MainContext } from '../App';

const publicRooms1 = [
  {
    "name": "Programming",
    "cover": "https://cdn.pixabay.com/photo/2017/02/25/23/52/connections-2099068__340.png",
    "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    "name": "Sports",
    "cover": "https://cdn.pixabay.com/photo/2017/02/25/23/52/connections-2099068__340.png",
    "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    "name": "Study",
    "cover": "https://cdn.pixabay.com/photo/2017/02/25/23/52/connections-2099068__340.png",
    "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    "name": "Travelling",
    "cover": "https://cdn.pixabay.com/photo/2017/02/25/23/52/connections-2099068__340.png",
    "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    "name": "Eating",
    "cover": "https://cdn.pixabay.com/photo/2017/02/25/23/52/connections-2099068__340.png",
    "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  }
];

const _socket = io.connect('http://localhost:4000');

const Home = () => {
  const { setSocket, setRoom } = useContext(MainContext);
  const navigate = useNavigate();
  setSocket(_socket);
  const [publicRooms, setPublicRooms] = useState(publicRooms1);

  const doLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const joinRoom = (room) => {
    const username = localStorage.getItem("username");
    setRoom(room);
    _socket.emit("join_room", { username, room });
    navigate("/chat");
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
              <div className="px-1 text-xs mb-1">{room.about}</div>
              <button className="bg-blue-500 text-white w-full py-2 rounded hover:opacity-80" onClick={()=>joinRoom(room.name)}>
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