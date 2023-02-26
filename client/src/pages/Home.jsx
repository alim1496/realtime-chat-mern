import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { MainContext } from '../App';
import logo from "../assets/logo.png";
import { DEV_URL, PROD_URL } from '../Constants';

const _socket = io(DEV_URL);

const Home = () => {
  const { setSocket, setRoom, setShowModal, publicRooms, setPublicRooms, socket } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
    setSocket(_socket);
  }, []);

  const fetchRooms = () => {
    fetch("/api/v1/rooms")
      .then(res => res.json())
      .then(({ result }) => {
        setPublicRooms(result);
      })
      .catch(err => console.log(err));
  };

  const doLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userID");
    socket.disconnect();
    navigate("/login");
  };

  const joinRoom = (room) => {
    const username = localStorage.getItem("username");
    setRoom(room);
    _socket.emit("join_room", { username, room });
    navigate(`/room/${room}`);
  };

  return (
    <div className="bg-slate-50">
      <div className="container mx-auto h-screen">
        <div className="flex justify-between items-center fixed top-0 left-0 right-0 bg-white p-4 shadow-md">
          <img src={logo} alt="logo" className="w-24" />
          <div className="flex items-center">
            <span className="ml-4">Welcome {localStorage.getItem("username")}</span>
            <button type="button" className="ml-4 px-4 py-1 rounded text-white bg-green-500 hover:cursor-pointer hover:opacity-80" onClick={()=>setShowModal(true)}>Create</button>
            <span className="ml-4 font-bold hover:cursor-pointer" onClick={doLogout}>Logout</span>
          </div>
        </div>
        <div className="px-4 py-20">
          <h3 className="font-bold mb-2 text-xl">Rooms</h3>
          <div className="flex flex-wrap">
            {publicRooms && publicRooms.map((room, index) => (
              <div className="w-72 rounded shadow-lg mr-2 mb-2 bg-white p-2" key={index}>
                <img src={room.cover} alt="cover" className="w-full h-36 mb-1" />
                <div className="font-bold px-1">{room.name}</div>
                <div className="px-1 mb-1">{room.category}</div>
                <button className="bg-blue-500 text-white w-full py-2 rounded hover:opacity-80" onClick={()=>joinRoom(room._id)}>
                  Join Room
                </button>
              </div>
            ))}
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Home;